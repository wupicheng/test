'use strict';

(function() {
	// Directions Controller Spec
	describe('DirectionsController', function() {
		// Initialize global variables
		var DirectionsController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Directions controller.
			DirectionsController = $controller('DirectionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one direction object fetched from XHR', inject(function(Directions) {
			// Create sample direction using the Directions service
			var sampleDirection = new Directions({
				title: 'An Direction about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample directions array that includes the new direction
			var sampleDirections = [sampleDirection];

			// Set GET response
			$httpBackend.expectGET('directions').respond(sampleDirections);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.directions).toEqualData(sampleDirections);
		}));

		it('$scope.findOne() should create an array with one direction object fetched from XHR using a directionId URL parameter', inject(function(Directions) {
			// Define a sample direction object
			var sampleDirection = new Directions({
				title: 'An Direction about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.directionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/directions\/([0-9a-fA-F]{24})$/).respond(sampleDirection);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.direction).toEqualData(sampleDirection);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Directions) {
			// Create a sample direction object
			var sampleDirectionPostData = new Directions({
				title: 'An Direction about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample direction response
			var sampleDirectionResponse = new Directions({
				_id: '525cf20451979dea2c000001',
				title: 'An Direction about MEAN',
				content: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.title = 'An Direction about MEAN';
			scope.content = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('directions', sampleDirectionPostData).respond(sampleDirectionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the direction was created
			expect($location.path()).toBe('/directions/' + sampleDirectionResponse._id);
		}));

		it('$scope.update() should update a valid direction', inject(function(Directions) {
			// Define a sample direction put data
			var sampleDirectionPutData = new Directions({
				_id: '525cf20451979dea2c000001',
				title: 'An Direction about MEAN',
				content: 'MEAN Rocks!'
			});

			// Mock direction in scope
			scope.direction = sampleDirectionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/directions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/directions/' + sampleDirectionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid directionId and remove the direction from the scope', inject(function(Directions) {
			// Create new direction object
			var sampleDirection = new Directions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new directions array and include the direction
			scope.directions = [sampleDirection];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/directions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDirection);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.directions.length).toBe(0);
		}));
	});
}());