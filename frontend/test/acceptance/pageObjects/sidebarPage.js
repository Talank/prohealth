module.exports ={
    url(){
        return this.api.launch_url
    },
    commands:{
        selectLogoutButton:function () {
            return this.useXpath().waitForElementVisible('@logoutButton')
                .click('@logoutButton')
                .useCss()
        },
        selectNewsButton: function () {
            return this.useXpath().waitForElementVisible('@newsButton')
                .click('@newsButton')
                .useCss();

        },
        getNews: function () {
            return this.navigate('/news')
        }
    },
    elements:{
        logoutButton:{
            selector: '//div/a/div[contains(text(),"Logout")]',
            locateStrategy:'xpath'
        },
        newsButton:{
            selector: '//div[.="News"]',
            locateStrategy: 'xpath'
        }

    }
}