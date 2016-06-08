var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.name = "Dogs fight able abolish acclaim famous is airwaves favor diary darling handbag";
  //  $scope.name = "The affected animals adventure everywhere.";
    $scope.challenge = function() {
        var str1 = $scope.name.split(' '),
            temp = str1[0].length;
            //str1.splice(0, 1);
            
            result = '';
        for (var i = 1; i < str1.length; i++) {
          if (temp <= str1[i].length) {
            result += str1[i].split('')[temp - 1];
          } else {
          	result += " ";
          }
        }
        
        return result;
    };

  
  
  
});


// var result = str1.map(function(word) 
//             { return word.charAt(temp - 1)
//             });