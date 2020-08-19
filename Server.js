var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require ('socket.io')(server);
var bodyParser = require('body-parser');
var nodemailer = require("nodemailer");

//Necessary for email
var smtpTransport = nodemailer.createTransport("SMTP",{
host: 'email.host.org',
port: 25,
domain:'business.org',
tls: {ciphers:'SSLv3'}
});

// Keeps track of all the users online (mainly for use in chat systems, but could be useful for responding to [or commenting on] tickets)
var users = [];

//sets up the socket variable
//The socket variable is used to pass and store data on the client side for use in data getting and setting on the server end.
//This will be mainly used for rememebering who's logged in. 
var socket;

//This connects to the service that sends and returns live data
io.on('connection', function(socket){
    //Lets the admin know when a user is connected. Only states when a connection is made to the login/landing page.
    console.log('A user connected');    
    
    socket.on('add_ticket', function(ticket){
        
        add_ticket(ticket, function(res){
            if(res == "1"){
                io.emit('Message', "1");

            }else if(res == "2"){
                io.emit('Message', "2");
                console.log(res);
                //io.emit('refresh feed', msg);
                //console.log('refresh feed, status ');
            } else {
                io.emit('error');
                //io.emit('Message', res);
                console.log('there was an error under socket.on add_ticket');
            }
        });
    });
    
    //disconnects link to server to prevent too many connections to the server
    socket.on('disconnect', function() {
     //Code inserted in here will run on user disconnect. 
     console.log('A user has disconnected');
        socket.disconnect();
        
    });
    
    

});

//used to start and run the server
server.listen(3009, function(){
    console.log("listening on *:3009");
});

app.use(express.static('files'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//In this version of app.get, the '/' sets the home page when you enter the page. 
app.get('/', function(req, res){
        res.sendFile(__dirname + '/index.html');
});

var add_ticket = function (ticket, callback){
    console.log("connecting");
    
    if((ticket.BiClMini != "" || ticket.BiClSmall != "" || ticket.BiClMedium != "" || ticket.BiClLarge != "") && ticket.NumOBinderClips != "")
        {
            var BinderClips = "BinderClips: "+ticket.BiClMini +" "+ ticket.BiClSmall +" "+ ticket.BiClMedium +" "+ ticket.BiClLarge +" x"+ ticket.NumOBinderClips+ "</br>";
        }else{
            var BinderClips = "";
        }
    
    if((ticket.BicBlue != "" || ticket.BicBlack != "") && ticket.NumOBic != "")
        {
            var BicPens = "BicPens: "+ticket.BicBlue +" "+ ticket.BicBlack +" x"+ ticket.NumOBic+ "</br>";
        }else{
            var BicPens = "";
        }
    
    if((ticket.ClipbSmall != "" || ticket.ClipbRegular != "") && ticket.NumOClipboards != "")
        {
            var Clipboards = "Clipboards: "+ticket.ClipbSmall +" "+ ticket.ClipbRegular +" x"+ ticket.NumOClipboards+ "</br>";
        }else{
            var Clipboards = "";
        }
    
    if(ticket.NumOCreditMachine != "")
        {
            var CreditMachine = "Credit Machine Paper Rolls: x"+ ticket.NumOCreditMachine+ "</br>";
        }else{
            var CreditMachine = "";
        }
    
    if(ticket.NumOScotch != "")
        {
            var Scotch = "Scotch Tape Refills: x"+ ticket.NumOScotch+ "</br>";
        }else{
            var Scotch = "";
        }
    
    if((ticket.FFLetter != "" || ticket.FFLegal != "") && ticket.NumOFileFolders != "")
        {
            var FileFolders = "File Folders: "+ticket.FFLetter +" "+ ticket.FFLegal +" x"+ ticket.NumOFileFolders+ "</br>";
        }else{
            var FileFolders = "";
        }
    
    if((ticket.ChisHighAssorted != "" || ticket.ColorHighLighter != "") && ticket.NumOChisel != "")
        {
            var HighLighters = "Chiseled Highlighters: "+ticket.ChisHighAssorted +" "+ ticket.ColorHighLighter +" x"+ ticket.NumOChisel+ "</br>";
        }else{
            var HighLighters = "";
        }
    
    if(ticket.NumOInterOffice != "")
        {
            var InterOffice = "Interoffice Envelopes: x"+ ticket.NumOInterOffice+ "</br>";
        }else{
            var InterOffice = "";
        }
    
    if((ticket.LPadsWhite != "" || ticket.LPadsYellow != "") && ticket.NumOLegalPads != "")
        {
            var LegalPads = "Legal Pads: "+ticket.LPadsWhite +" "+ ticket.LPadsYellow +" x"+ ticket.NumOLegalPads+ "</br>";
        }else{
            var LegalPads = "";
        }
    
    if((ticket.FiveSevWhite != "" || ticket.FiveSevYellow != "") && ticket.NumOFiveSevPads != "")
        {
            var FiveSev = "5x7 Pads: "+ticket.FiveSevWhite +" "+ ticket.FiveSevYellow +" x"+ ticket.NumOFiveSevPads+ "</br>";
        }else{
            var FiveSev = "";
        }
    
    if((ticket.PClipsRegular != "" || ticket.PClipsJumbo != "") && ticket.NumOPaperClips != "")
        {
            var PClips = "Paper Clips: "+ticket.PClipsRegular +" "+ ticket.PClipsJumbo +" x"+ ticket.NumOPaperClips+ "</br>";
        }else{
            var PClips = "";
        }
    
    if((ticket.StapleRegular != "" || ticket.StapleElectric != "") && ticket.NumOStaples != "")
        {
            var Staples = "Staples: "+ticket.StapleRegular +" "+ ticket.StapleElectric +" x"+ ticket.NumOStaples+ "</br>";
        }else{
            var Staples = "";
        }
    
    if((ticket.StaplerRegular != "" || ticket.StaplerElectric != "") && ticket.NumOStaplers != "")
        {
            var Staplers = "Staplers: "+ticket.StaplerRegular +" "+ ticket.StaplerElectric +" x"+ ticket.NumOStaplers+ "</br>";
            console.log(ticket.StapleElectric);
        }else{
            var Staplers = "";
        }
    
    if((ticket.SharpiesFinePoint != "" || ticket.SharpiesLarge != "") && ticket.NumOSharpies != "")
        {
            var Sharpies = "Sharpies: "+ticket.SharpiesFinePoint +" "+ ticket.SharpiesLarge +" x"+ ticket.NumOSharpies+ "</br>";
        }else{
            var Sharpies = "";
        }
    
    if((ticket.BattAA != "" || ticket.BattAAA != "") && ticket.NumOBatteries != "")
        {
            var Batteries = "Batteries: "+ticket.BattAA +" "+ ticket.BattAAA +" x"+ ticket.NumOBatteries+ "</br>";
        }else{
            var Batteries = "";
        }
    
    if(ticket.NumODryEraseMarkers != "")
        {
            var DryEraseMarkers = "Dry Erase Markers: x"+ ticket.NumODryEraseMarkers+ "</br>";
        }else{
            var DryEraseMarkers = "";
        }
    
    if(ticket.NumODryErasers != "")
        {
            var DryErasers = "Dry Erasers: x"+ ticket.NumODryErasers+ "</br>";
        }else{
            var DryErasers = "";
        }
    
    if((ticket.WOLiquid != "" || ticket.WOTape != "") && ticket.NumOWhiteOut != "")
        {
            var Whiteout = "Whiteout: "+ticket.WOLiquid +" "+ ticket.WOTape +" x"+ ticket.NumOWhiteOut+ "</br>";
        }else{
            var Whiteout = "";
        }
    
    if(ticket.NumOGooGone != "")
        {
            var GooGone = "Goo Gone: x"+ ticket.NumOGooGone+ "</br>";
        }else{
            var GooGone = "";
        }
    
    if(ticket.NumOSwifferDuster != "")
        {
            var SwifferDuster = "Swiffer Duster: x"+ ticket.NumOSwifferDuster+ "</br>";
        }else{
            var SwifferDuster = "";
        }
    
    if(ticket.NumOAssortedDots != "" || ticket.AssortedDotsCol != "")
        {
            var AssortedDots = "Assorted Dots: "+ticket.AssortedDotsCol+" x"+ ticket.NumOAssortedDots+ "</br>";
        }else{
            var AssortedDots = "";
        }
    
    if(ticket.NumOBluePRMas != "")
        {
            var BlueProcMasks = "Blue Procedure Masks: x"+ ticket.NumOBluePRMas+ "</br>";
        }else{
            var BlueProcMasks = "";
        }
    
    if((ticket.HangFFLegal != "" || ticket.HangFFLetter != "") && ticket.NumOHangFileFold != "")
        {
            var HangingFold = "Hanging Folders: "+ticket.HangFFLegal +" "+ ticket.HangFFLetter +" x"+ ticket.NumOHangFileFold+ "</br>";
        }else{
            var HangingFold = "";
        }
    
    if(ticket.NumOAssortLab != "" || ticket.AssortLabSiz != "" ||
ticket.AssortLabCol != "")
        {
            var AssortedLabels = "Size: "+ticket.AssortLabSiz+" Color: "+ticket.AssortLabCol+" Assorted Labels: x"+ ticket.NumOAssortLab+ "</br>";
        }else{
            var AssortedLabels = "";
        }
    
    if(ticket.NumONameBadge != "")
        {
            var NameBadge = "Name Badges: x"+ ticket.NumONameBadge+ "</br>";
        }else{
            var NameBadge = "";
        }
    
    if(ticket.NumOFlipChart != "")
        {
            var FlipChart = "Flip Chart Markers: x"+ ticket.NumOFlipChart+ "</br>";
        }else{
            var FlipChart = "";
        }
    
    if(ticket.NumORegTape != "")
        {
            var RegTape = "Register Tape: x"+ ticket.NumORegTape+ "</br>";
        }else{
            var RegTape = "";
        }
    
    if(ticket.NumOCreditTape != "")
        {
            var CreditTape = "Credit Tape: x"+ ticket.NumOCreditTape+ "</br>";
        }else{
            var CreditTape = "";
        }
    
    if(ticket.NumOLibCards != "")
        {
            var LibCards = "Library Cards: x"+ ticket.NumOLibCards+ "</br>";
        }else{
            var LibCards = "";
        }
    
    if(ticket.NumOPackTape != "")
        {
            var PackTape = "Packing Tape: x"+ ticket.NumOPackTape+ "</br>";
        }else{
            var PackTape = "";
        }
    
    if(ticket.NumOSwifferDust != "")
        {
            var SwifferDust = "Swiffer Duster Refills: x"+ ticket.NumOSwifferDust+ "</br>";
        }else{
            var SwifferDust = "";
        }
    
    if(ticket.NumOSwifferWetPads != "")
        {
            var SwifferWetPads = "Swiffer Wet Jet Pads: x"+ ticket.NumOSwifferWetPads+ "</br>";
        }else{
            var SwifferWetPads = "";
        }
    
    if(ticket.NumOSwifferWetClean != "")
        {
            var SwifferWetClean = "Swiffer Wet Jet Cleaner: x"+ ticket.NumOSwifferWetClean+ "</br>";
        }else{
            var SwifferWetClean = "";
        }
    
    if((ticket.PockOther != "" || ticket.PockRed != "") && ticket.NumOPockFolders != "")
        {
            var PocketFolders = "Hanging Folders: "+ticket.PockOther +" "+ ticket.PockRed +" x"+ ticket.NumOPockFolders+ "</br>";
        }else{
            var PocketFolders = "";
        }
    
    if(ticket.NumOAlphaDiv != "")
        {
            var AlphaDivs = "Alpha Dividers: x"+ ticket.NumOAlphaDiv+ "</br>";
        }else{
            var AlphaDivs = "";
        }
    
    if(ticket.NumONumDiv != "")
        {
            var NumDiv = "Numerical Dividers: x"+ ticket.NumONumDiv+ "</br>";
        }else{
            var NumDiv = "";
        }
    
    if( ticket.TabType !="" || ticket.TabColorDividers !="" || ticket.NumOTabDiv != "")
        {
            var NumTabDiv = "Tab Dividers: "+ticket.TabType +" "+ ticket.TabColorDividers +" x"+ ticket.NumOTabDiv+ "</br>";
        }else{
            var NumTabDiv = "";
        }
    
    if((ticket.BindSize != "" || ticket.BindColor != "") && ticket.NumOBinders != "")
        {
            var Binders = "Binders: "+ticket.BindSize +" "+ ticket.BindColor +" x"+ ticket.NumOBinders+ "</br>";
        }else{
            var Binders = "";
        }
    
    if(ticket.NumOPinkSlips != "")
        {
            var PinkSlips = "Pink Slips: x"+ ticket.NumOPinkSlips+ "</br>";
        }else{
            var PinkSlips = "";
        }
    
    if((ticket.CalDeskPad != "" || ticket.CalHanging != "" || ticket.CalThrMonth != ""|| ticket.CalMini != "") && ticket.NumOCalendar != "")
        {
            var Calendars = "Calendar: "+ticket.CalDeskPad +" "+ ticket.CalHanging +" "+ ticket.CalThrMonth +" "+ ticket.CalMini +" x"+ ticket.NumOCalendar+ "</br>";
        }else{
            var Calendars = "";
        }
    
    if((ticket.CalRefE7 != "" || ticket.CalRefE9 != "") && ticket.NumOCalRefills != "")
        {
            var CalendarRef = "Calendar Refills: "+ticket.CalRefE7 +" "+ ticket.CalRefE9 +" x"+ ticket.NumOCalRefills+ "</br>";
        }else{
            var CalendarRef = "";
        }
    
    if(ticket.NumOReceiptRolls != "" || ticket.NumOReceiptRollCase != "")
        { 
            console.log(ticket.NumOReceiptRollCase);
            console.log(ticket.NumOReceiptRolls);
            var NumOReceiptRolls = "ReceiptRolls: x"+ticket.NumOReceiptRolls+ " Cases: x"+ticket.NumOReceiptRollCase+ "</br>";
        }else{
            var NumOReceiptRolls = "";
            console.log(ticket.NumOReceiptRollCase);
            console.log(ticket.NumOReceiptRolls);
            console.log("Failed")
        }
    
    if(ticket.NumOReceiptBooks != "")
        {
            var NumOReceiptBooks = "ReceiptBooks: "+ticket.NumOReceiptBooks+ "</br>";
        }else{
            var NumOReceiptBooks = "";
        }
    
    if(ticket.NumOKleenex != "")
        {
            var NumOKleenex = "Kleenex: "+ticket.NumOKleenex+ "</br>";
        }else{
            var NumOKleenex = "";
        }
    
    if( ticket.CopyPaper1 !="" || ticket.CopyPaper2 !="" || ticket.CopyPaper3 !="" || ticket.NumCopyPaper != "" || ticket.NumCasePaper)
        {
            var NumCopPap = "Copy Paper: "+ticket.CopyPaper1 +" "+ticket.CopyPaper2 +" "+ ticket.CopyPaper3 +" Reams x"+ ticket.NumCopyPaper+ ", Cases x"+ticket.NumCasePaper+"</br>";
        }else{
            var NumCopPap = "";
        }
    if (ticket.fEmail != undefined){
    
        /*=============Mail to Terri===============*/        
                var mailOptions={
        to : 'Supply Req <terri.miller@elyrialibrary.org>',
        subject : ticket.fBuilding +' ReSupply Request',
        html : 'Email: '+ticket.fEmail+'<br>'+'Location: '+ ticket.fBuilding +' '+ ticket.fLocation + '<br>' + BinderClips + BicPens + Clipboards + CreditMachine + Scotch + FileFolders + HighLighters + InterOffice + LegalPads + FiveSev + PClips + Staples + Staplers + Sharpies + Batteries + DryEraseMarkers + DryErasers + Whiteout + GooGone + SwifferDuster + AssortedDots + BlueProcMasks + HangingFold + AssortedLabels + NameBadge + FlipChart + RegTape + CreditTape + LibCards + PackTape + SwifferDust + SwifferWetPads + SwifferWetClean + PocketFolders + AlphaDivs + NumDiv + NumTabDiv + Binders + PinkSlips + Calendars + CalendarRef + NumOKleenex + NumCopPap + NumOReceiptRolls +'<br><br> Comments: '+ ticket.Comment +'<br><br>',
        from: 'Supply Req <' + ticket.fEmail + '>'
        }

            console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
        console.log(error);

        }else{
        console.log("Message sent: " + response.message);
        }
        });

        /*=============Mail to User===============*/        
                var mailOptions={
        to : 'Supply Req '+ticket.fEmail+'>',
        subject : 'ReSupply Request Receipt',
        html : 'Email: '+ticket.fEmail+'<br>'+'Location: '+ ticket.fBuilding +' '+ ticket.fLocation + '<br>' + BinderClips + BicPens + Clipboards + CreditMachine + Scotch + FileFolders + HighLighters + InterOffice + LegalPads + FiveSev + PClips + Staples + Staplers + Sharpies + Batteries + DryEraseMarkers + DryErasers + Whiteout + GooGone + SwifferDuster + AssortedDots + BlueProcMasks + HangingFold + AssortedLabels + NameBadge + FlipChart + RegTape + CreditTape + LibCards + PackTape + SwifferDust + SwifferWetPads + SwifferWetClean + PocketFolders + AlphaDivs + NumDiv + NumTabDiv + Binders + PinkSlips + Calendars + CalendarRef+ NumOKleenex + NumCopPap + NumOReceiptRolls +'<br><br> Comments: '+ ticket.Comment +'<br><br>',
        from: 'Supply Req <' + ticket.fEmail + '>'
        }

            console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
        console.log(error);

        }else{
        console.log("Message sent: " + response.message);
        }

        });

                callback("2");
        console.log(ticket.fEmail);
    }else{
        callback("1");
    }
        /*connection.release();*/
        /*});*/
};

