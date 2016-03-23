function personController($scope) {
	$scope.firstName = "John",
	$scope.lastName = "Smith",
	$scope.fullName = function() {
      return $scope.firstName.uppercase + " " + $scope.lastName.lowercase;
	}
}
