#!/usr/bin/node
var Browser = require("zombie");
var assert = require("assert");
var MongoClient = require('mongodb').MongoClient;
var execFile = require('child_process').execFile;

// Enter your own username and password here
username = '';
password = '';

emailText = ' ';

var browserIns = new Browser();

function dbResponse (err, item) {
	if(!item) {
		console.log(listStudies[itr].innerHTML+" not found in database adding it to database and sending an email about it");
    	collection.insert({studyName:listStudies[itr].innerHTML},{w:1}, function(err, result) {});
    	// Invoke the mail sending script
    	emailText += listStudies[itr].innerHTML +" ";
    }
    else {
		console.log(listStudies[itr].innerHTML + " : Already present");
	}	
	itr++;
	
	if(itr < listStudies.length) {
		checkDatabase();
	}
	else{
		if(emailText != ' ') {
			execFile('./mailSend.sh',[emailText],{timeout: 9000000});
		}
	}
	
	if (err) {
		console.log(err);
	};
}

function checkDatabase () {
    collection = database.collection('testData');
    collection.findOne({studyName:listStudies[itr].innerHTML}, function(err, item) {
		dbResponse(err,item);
    });
}


function checkWebsite () {
	browserIns.visit("https://sds-tepper.sona-systems.com/", function () {
		browserIns.fill('ctl00$ContentPlaceHolder1$userid',username)
		.fill('ctl00$ContentPlaceHolder1$pw',password)
		.pressButton('#ctl00_ContentPlaceHolder1_default_auth_button',function () {
			browserIns.visit("https://sds-tepper.sona-systems.com/all_exp.aspx", function () {
				listStudies = browserIns.queryAll("[id$='HyperlinkStudentStudyInfo']");
				itr =0;
				emailText = ' ';
				checkDatabase();
			});	
		});
	});
}

MongoClient.connect("mongodb://localhost:27017/cbdr", function(err, db) {
	if(!err) {
		database = db;
		setInterval(checkWebsite,900000);
	}
	else {
		console.log(err);
	}
});
