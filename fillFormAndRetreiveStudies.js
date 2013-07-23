var casper = require('casper').create();
var userName = '';
var password = '';
casper.start("https://sds-tepper.sona-systems.com/",function () {
    this.waitForSelector('#aspnetForm', function () { 
        this.fill('#aspnetForm',{
            'ctl00$ContentPlaceHolder1$userid':username,
            'ctl00$ContentPlaceHolder1$pw':password,
        });
    });
    this.viewport(1640,1080);
    this.echo(this.getCurrentUrl());
    this.capture('sshot1.png',{top: 0, left:0, width: 1640, height: 1080});
});
casper.thenClick('#ctl00_ContentPlaceHolder1_default_auth_button',function () {
    this.echo(this.getCurrentUrl());
    this.capture('sshot2.png',{top: 0, left: 0, width: 1640, height: 1080});
});
casper.then( function () {
    this.echo(this.getCurrentUrl());
    this.waitForSelector('#ctl00_ContentPlaceHolder1_lnkStudiesText', function () { 
        this.click('#ctl00_ContentPlaceHolder1_lnkStudiesText');
    });
    this.capture('sshot3.png',{top: 0, left: 0, width: 1640, height: 1080});
});
casper.then( function () {
    this.echo(this.getCurrentUrl());
    this.capture('sshot4.png',{top: 0, left: 0, width: 1640, height: 1080});
    links = this.evaluate(function() {
        var elements = __utils__.findAll('td');
        return Array.prototype.forEach.call(elements, function(e) {
            return e;
        });
    });
    this.echo(links);
    console.log(links);
});
casper.run();
