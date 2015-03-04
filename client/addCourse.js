Meteor.subscribe("hearing");

Template.body.events( {
  "click .add-coursera-btn": function () {
      Meteor.call("addCourseraCoursesToMongo", function(err, respJson) {
        if (err) {
          console.log(err);
        } else {
          // console.log("respJSON: ", respJson);
        }
      });
    },
    "click .add-edx-btn": function () {
        Meteor.call("addEdxCoursesToMongo", function(err, respJson) {
          if (err) {
            console.log(err);
          } else {
            // console.log("respJSON: ", respJson);
          }
        });
      },
      "click .add-udemy-btn": function () {
        Meteor.call("addUdemyCoursesToMongo", function(err, respJson) {
          if (err) {
            console.log(err);
          } else {
            // console.log("respJSON: ", respJson);
          }
        });
      },
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_AND_EMAIL"
});

Template.basic_typehead.helpers({
  getCourses: function () {
      return Courses.find().fetch().map( function (it) { return it.name; } );
  }
});

Template.basic_typehead.rendered = function() {
  Meteor.typeahead.inject();
};

Template.basic_typehead.events({
  'submit .add-course': function (event) {
      console.log("submit called");
      var text = event.target.text.value;

      // insert the task into the database
      Meteor.call("addCourseToUser", text);

      // clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    }
});

Template.courses.events({
    'click button': function () {
      // call the function to get the coursera lectures
      Meteor.call('getLecturesCoursera', function (error, result) {
        if (error) {
          console.log("error", error);
        }

        console.log(result);
      });
    }
});
