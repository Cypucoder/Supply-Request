//https://scotch.io/tutorials/single-page-apps-with-angularjs-routing-and-templating

var app = angular.module('myApp', ['ngRoute', 'ngMessages']);

app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    },
      removeAllListeners: function (eventName, callback) {
          socket.removeAllListeners(eventName, function() {
              var args = arguments;
              $rootScope.$apply(function () {
                callback.apply(socket, args);
              });
          }); 
      }
  };
});


//used for datepicker and date inserting
app.directive('datepickerPopup', function (dateFilter, $parse){
    return {
        restrict: 'EAC',
        require: '?ngModel',
        link: function(scope, element, attr, ngModel,ctrl) {
            ngModel.$parsers.push(function(viewValue){
                return dateFilter(viewValue, 'yyyy-MM-dd');
    });
    }
  }
});


//defines the rules and data available to the web page
//more efficient use of the server
app.controller('data_get', function($scope, $http, socket, $location){
//$scope.LoggedIn = "Logout";
$scope.addTicket = function(ticket){socket.emit('add_ticket', ticket)};
$scope.redirect = function(){window.location = "/MS.html";};    
//$http.get('/DB/').success(function(data){$scope.data=data; $scope.data.LoggedIn = "Logout";});
    
    socket.on('error', function(){
        $scope.message ="Something went wrong. Please double check everything and try again. ";
    });
    
    
    socket.on('Message', function(msg){
        //$scope.message ="Success. You should be redirected in a second.";
        if(msg == "1")
            {
                console.log("1");
                //window.location = "/MS.html";
                $scope.message ="Double check your email is entered.";
            }else{
                //window.location = "#";
                console.log("not 1");
                //window.location = "/MS.html";
                $scope.message ="";
                $scope.redirect();
            }
        console.log(msg);
    });
    
    $scope.redirect = function(){window.location = "/MS.html";};
    
$scope.ticket = {
BiClMini: "''",
BiClSmall: "''",
BiClMedium: "''",
BiClLarge: "''",
BicBlue: "''",
BicBlack: "''",
ClipbSmall: "''",
ClipbRegular: "''",
FFLetter: "''",
FFLegal: "''",
ChisHighAssorted: "''",
ChisHighOther: "''",
LPadsWhite: "''",
LPadsYellow: "''",
FiveSevWhite: "''",
FiveSevYellow: "''",
PClipsRegular: "''",
PClipsJumbo: "''",
StapleRegular: "''",
StapleElectric: "''",
StaplerRegular: "''",
StaplerElectric: "''",
SharpiesFinePoint: "''",
SharpiesLarge: "''",
BattAA: "''",
BattAAA: "''",
WOLiquid: "''",
WOTape: "''",
HangFFLegal: "''",
HangFFLetter: "''",
SwifferWetJetPads: "''",
PockOther: "''",
PockRed: "''",
BindSize: "''",
BindColor: "",
CalDeskPad: "''",
CalHanging: "''",
CalThrMonth: "''",
CalMini: "''",
ColorBicPen: "",
ColorClipBoards: "",
ColorHighLighter: "",
ColorDividers: "",
TabType:"",
TabColorDividers:"",
NumOBinderClips: "",
AssortLabSiz:"",
AssortLabCol:"",
AssortedDotsCol:"",
NumOKleenex:"",
CopyPaper1:"",
CopyPaper2:"",
CopyPaper3:"",
NumOReceiptRollCase:"",
NumCopyPaper:"",
NumOReceiptRolls:"",
NumOReceiptBooks:"",
NumOBic: "",
NumOClipboards: "",
NumOCreditMachine: "",
NumOScotch: "",
NumOFileFolders: "",
NumOChisel: "",
NumOInterOffice: "",
NumOLegalPads: "",
NumOFiveSevPads: "",
NumOPaperClips: "",
NumOStaples: "",
NumOStaplers: "",
NumOSharpies: "",
NumOBatteries: "",
NumODryEraseMarkers: "",
NumODryErasers: "",
NumOWhiteOut: "",
NumOGooGone: "",
NumOSwifferDuster: "",
NumOAssortedDots: "",
NumOBluePRMas: "",
NumOHangFileFold: "",
NumOAssortLab: "",
NumONameBadge: "",
NumOFlipChart: "",
NumORegTape: "",
NumOCreditTape: "",
NumOLibCards: "",
NumOPackTape: "",
NumOSwifferDust: "",
NumOSwifferWetPads: "",
NumOSwifferWetClean: "",
NumOPockFolders: "",
NumOAlphaDiv: "",
NumONumDiv: "",
NumOTabDiv: "",
NumOBinders: "",
NumOPinkSlips: "",
NumOCalendar: "",
NumOCalRefills: ""
}

})