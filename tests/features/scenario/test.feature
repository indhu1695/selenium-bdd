@Sanity
Feature: Sample BDD Feature File

  @ui-test
  Scenario: UI Page Validation

    Given I launch development url
    When I enter valid name, email and phone number
    And I select "Online Services" as needed service
    And I click "Digital Products" as product type to sell
    And I enter random message and submit form
    Then I should see form is submitted successful

  @dataBase-insertDetails
  Scenario: Insert value into database

    Given I authenticate to database
    When I insert below values
      |firstName|email|phoneNumber|service|productType|message|
      |tester|testing@wipro.com|9486350623|eCommerce Bussiness|Services Consulting|Hi, Im interested in selling products in your website. Kindly share the process for selling to given email|
    Then I should see new row inserted

  @dataBase-UI
  Scenario: Perform UI validation as per value present in database

    Given I authenticate to database
    And I retrieve last added row value
    Then I launch development url
    When I fill application using the retrieved values
    Then I should see form is submitted successful.
