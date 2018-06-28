from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.parsers import MultiPartParser, FormParser

from . models import UserQuery, Medicine, Appointment, File
from . serializer import UserQuerySerializer, AppointmentSerializer, MedicineSerializer, FileSerializer
from . permissions import IsDoctorUser, UpdateOwnUserQuery
from user_profile.models import User


class UserQueryView(APIView):

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, UpdateOwnUserQuery,)
    @staticmethod
    def get(request):
        user = request.user
        queries = UserQuery.objects.filter(user=user)
        if type(queries) == Response:
            return queries
        return Response(UserQuerySerializer(queries, many=True).data)

    @staticmethod
    def post(request):
        serializer = UserQuerySerializer(data=request.data, context = {'request':request})
        if serializer.is_valid():
            user = request.user
            serializer.save(user=user)
            return Response(UserQuerySerializer(serializer.instance).data, status=201)
        return Response(serializer.errors, status=400)


class UserQueryDetailView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, UpdateOwnUserQuery,)

    @staticmethod
    def get(request, query_id):
        queri = get_object_or_404(UserQuery, pk=query_id)
        return Response(UserQuerySerializer(queri).data)

    @staticmethod
    def patch(request, query_id):
        queri = get_object_or_404(UserQuery, pk=query_id)
        serializer = UserQuerySerializer(queri, data=request.data, context={'request':request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(UserQuerySerializer(serializer.instance).data)
        return Response(serializer.errors, status=404)
    
    @staticmethod
    def delete(request, query_id):
        queri = get_object_or_404(UserQuery, pk=query_id)
        if queri.user != request.user:
            return Response(status=401)#unauthorized
        queri.delete()
        return Response(status=204)#no content


class AppointmentView(APIView):
    permission_classes = (IsAuthenticated, IsDoctorUser, )
    @staticmethod
    def get(request, query_id,**kwargs):

        query = get_object_or_404(UserQuery, pk=query_id)
        appoint = get_object_or_404(Appointment,query=query)
        return Response(AppointmentSerializer(appoint).data)
    
    @staticmethod
    def post(request, query_id):
        query = get_object_or_404(UserQuery,pk=query_id)
        serializer = AppointmentSerializer(data=request.data, context = {'request':request})
        if serializer.is_valid():
            serializer.save(query=query)
            return Response(AppointmentSerializer(serializer.instance).data, status=201)
        return Response(serializer.errors, status=400)


class AppointmentDetailView(APIView):
    @staticmethod
    def get(request, query_id, **kwargs):
        query = get_object_or_404(UserQuery,pk=query_id)
        appoint = get_object_or_404(Appointment, query=query)
        return Response(AppointmentSerializer(appoint).data)

    @staticmethod
    def patch(request, query_id, **kwargs):
        query = get_object_or_404(UserQuery, pk=query_id)
        appoint = get_object_or_404(Appointment, query=query)
        serializer = AppointmentSerializer(appoint, data=request.data, context={'request':request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(AppointmentSerializer(serializer.instance).data)
        return Response(serializer.errors, status=400)

    @staticmethod
    def delete(request, query_id, **kwargs):
        query = get_object_or_404(UserQuery, pk=query_id)
        appoint = get_object_or_404(Appointment, query=query)
        if query.user != request.user:
            return Response(status=401)#unauthorized
        appoint.delete()
        return Response(status=204)#no content
        

class PrescribeView(APIView):
    authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated, IsDoctorUser,)
    @staticmethod
    def get(request, query_id):
        query = get_object_or_404(UserQuery,pk=query_id)
        prescribe =Medicine.objects.filter(query=query)
        return Response(MedicineSerializer(prescribe, many=True).data)

    @staticmethod
    @permission_classes((IsAuthenticated, IsDoctorUser, ))
    def post(request, query_id):
        user = request.user
        query = get_object_or_404(UserQuery,pk=query_id)
        serializer = MedicineSerializer(data=request.data, context = {'request':request})
        if serializer.is_valid() and user== user.is_doctor:
            serializer.save(query=query)
            return Response(MedicineSerializer(serializer.instance).data, status=201)
        return Response(serializer.errors, status=400)
        


class PrescribeDetailView(APIView):
    @staticmethod
    def get(request, query_id, prescribe_id):
        prescribe =get_object_or_404(Medicine, pk=prescribe_id)
        return Response(MedicineSerializer(prescribe).data)

    @staticmethod
    def delete(request, query_id, prescribe_id):
        query = get_object_or_404(UserQuery, pk=query_id)
        prescribe = Medicine.objects.filter(pk=prescribe_id)
        # if query.user != request.user:
        #     return Response(status=401)#unauthorized
        prescribe.delete()
        return Response(status=204)#no content


class FileView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    @staticmethod
    def get(request,query_id):
        query = get_object_or_404(UserQuery, pk=query_id)
        files = File.objects.filter(query=query)
        return Response(FileSerializer(files, many=True).data)
    
    @staticmethod
    def post(request, query_id):
        query = get_object_or_404(UserQuery, pk = query_id)
        serializer = FileSerializer(data = request.data, context={'request':request})
        if serializer.is_valid():
            serializer.save(query=query)
            return Response(FileSerializer(serializer.instance).data, status=201)
        return Response(serializer.errors, status=400)

class FileDetailView(APIView):

    @staticmethod
    def get(request, query_id, files_id):
        files = get_object_or_404(File, pk=files_id)
        return Response(FileSerializer(files).data)
    
    @staticmethod
    def delete(request, query_id, files_id):
        query = get_object_or_404(UserQuery, pk = query_id)
        files = File.objects.filter(pk=files_id)
        if query.user != request.user:
            return Response(status=401)
        files.delete()
        return Response(status=204)