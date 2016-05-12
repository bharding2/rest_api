const angular = require('angular');
const slothbearApp = angular.module('slothbearApp', []);
const baseUrl = 'http://localhost:5555';

var handleErr = function(err) {
  console.log(err);
  this.errs = (this.errs || []).push(err);
};

slothbearApp.controller('BearsController', ['$http', function($http) {
  this.bears = [];

  this.getAll = () => {
    $http.get(baseUrl + '/api/bears')
      .then((response) => {
        this.bears = response.data;
      }, handleErr.bind(this));
  };

  this.createBear = () => {
    $http.post(baseUrl + '/api/bears', this.newBear)
      .then((response) => {
        this.bears.push(response.data);
        this.newBear = null;
      }, handleErr.bind(this));
  };

  this.updateBear = (bear) => {
    $http.put(baseUrl + '/api/bears/' + bear._id, bear)
      .then(() => {
        bear.editing = false;
      }, handleErr.bind(this));
  };

  this.removeBear = (bear) => {
    $http.delete(baseUrl + '/api/bears/' + bear._id)
      .then(() => {
        this.bears.splice(this.bears.indexOf(bear), 1);
      }, handleErr.bind(this));
  };
}]);
