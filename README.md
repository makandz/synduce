# Synduce / 6 Devs 1 App

## Description 
 * Provide a high-level description of your application and it's value from an end-user's perspective
 * What is the problem you're trying to solve?
 * Is there any context required to understand **why** the application solves this problem?

Sometimes using a command line interface is not so friendly. It can be very unintuitive to use or can be a very boring wall of text to look at. Our web application is a tool enabling you to interface with the Synduce application online with a much friendlier interface. You can write OCaml scripts in the built-in text editor. Once you are done, you can execute Synduce to begin synthesizing your code and the application will run in the cloud. Once it has run it will return the log output. Our product gives ease of mind to any user. They do not have to look at a command line and they have the convenience of running Synduce online with the ability to create accounts as well.

## Key Features
 * Described the key features in the application that the user can access
 * Provide a breakdown or detail for each feature that is most appropriate for your application
 * This section will be used to assess the value of the features built

There are three main features that are currently functional in the application. Firstly we have the code editor. A user can access the code editor from the home page either as an existing user or they can sign in as a guest. Next, we have the login and profile pages. The login page allows a user to login or register for an account, whereas the profile page allows you to update the email and password of your account. Finally, the main purpose of this application is to allow you to run Synduce, and this is done at the click of a button on the code editor page. Once you have submitted a job for Synduce to run and it has completed, it will return to you the log output from Synduce. You can also check and update the job status also done through a button on the code editor page.

## Instructions
 * Clear instructions for how to use the application from the end-user's perspective
 * How do you access it? Are accounts pre-created or does a user register? Where do you start? etc. 
 * Provide clear steps for using each feature described above
 * This section is critical to testing your application and must be done carefully and thoughtfully
 
After typing in the URL for the application a user will be brought to the splash page of the website. Here there are 3 main options:

- Login as an existing user
    - The button for this option is available in the navigation bar. Once you click it you will be taken to the login page where you can enter your credentials. After you have logged in you will be taken to the code editor page.
- Register for an account using an email and password 
    - This button is also located in the nav bar. Again you will be taken to a page where you can enter your email and password and your account will be registered. After registering your account you will be taken to the code editor page. 
- Login as a guest
    - Simply click on the Try It Now button in the middle of the screen. This will take you directly to the code editor page and you can start entering your code here.
- You can also view the synduce source code for Synduce on github if you wish from the home page.

In every scenario the main navigation buttons can be found in the nav bar. Once you have logged in you will see your email address that you used to log in and a log out button. If you click on the email you will be brought to a profile page where you can change your username and password. You can also click on Synduce in the navigation bar and it will take you to the home page again. 

Once you have logged in as a guest or a registered user, and are on the code editor screen you can begin to type in your OCaml scripts. Once you are ready with what you wanted to try you can hit the execute code button right under the editor to start allowing Synduce to synthesize your code. You will be able to see the log output from Synduce at the bottom of the page once the job has finished. You can also force a query to check whether the job has finished right under the Execute code button.

 ## Development requirements
 * If a developer were to set this up on their machine or a remote server, what are the technical requirements (e.g. OS, libraries, etc.)?
 * Briefly describe instructions for setting up and running the application (think a true README).

You must already have npm installed and working on your system.
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

 ## Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.

 * Be concise, yet precise. For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
 * If applicable, specify any naming conventions or standards you decide to adopt.
 * Describe your overall deployment process from writing code to viewing a live applicatioon
 * What deployment tool(s) are you using and how
 * Don't forget to **briefly explain why** you chose this workflow or particular aspects of it!

The initial step is to first decide what specific part of the application each team member wants to work on. Once this is decided we go ahead and all of the team members use a separate branch whenever for each individual task. If we are adding some feature related to a task we can branch further from there and once done, merge into the respective task branch. In this part of the project the development branches were seperated into frontend and backend, and each member merged to the respective portion of the development branch. 

The deployment of the application is done through GitHub Actions. When deploying to the backend we update all the AWS Lambda functions that we are using, downloads all the dependencies with npm, bundle it all together, create and build the Docker image. The cloud service we are using to host our web application is Heroku and there is a GitHub actions set up for this as well.

We chose this workflow because it provides a simple. 

 ## Licenses 

 Keep this section as brief as possible. You may read this [Github article](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository) for a start.

 * What type of license will you apply to your codebase?
 * What affect does it have on the development and use of your codebase?
 * Why did you or your partner make this choice?

We will be using an MIT license. This is because the Synduce application is already under the MIT licence and to keep things consistent we will also make our code open source and use an MIT licence.

## Link to Application
