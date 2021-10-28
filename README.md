# Synduce / 6 Devs 1 App

## Description 
 * Provide a high-level description of your application and it's value from an end-user's perspective
 * What is the problem you're trying to solve?
 * Is there any context required to understand **why** the application solves this problem?

Sometimes using a command line interface is not so friendly. It can be very unintuitive to use or can be a very boring wall of text to look at. Our web application is a tool enabling you to interface with the Synduce application online with a much friendlier interface. You can write OCaml scripts in the built-in text editor or upload them. Once you are done, you can feed the scripts to Synduce and the application will run in the cloud. Once it has run it will return the log output, all in one click. Our product gives ease of mind to any user. They do not have to look at a command line and they have the convenience of running Synduce on the web.

## Key Features
 * Described the key features in the application that the user can access
 * Provide a breakdown or detail for each feature that is most appropriate for your application
 * This section will be used to assess the value of the features built

There are three main features that are currently functional in the application. Firstly we have the code editor. A user can access the code editor from the home page either as an existing user of the application or they can sign in as a guest. Next, we have the login and profile pages. The login page allows a user to login or register for an account, whereas the profile page allows you to update the email and password of your account. Finally, the main purpose of this application is to allow you to run the Synduce application, and this is done at the click of a button on the code editor page.   

## Instructions
 * Clear instructions for how to use the application from the end-user's perspective
 * How do you access it? Are accounts pre-created or does a user register? Where do you start? etc. 
 * Provide clear steps for using each feature described above
 * This section is critical to testing your application and must be done carefully and thoughtfully
 
After typing in the URL for the application a user will be brought to the splash page of the website. Here there are 3 main options: Login as an existing user, register for an account using and email and a password or login as a guest. You can also view the synduce source code for Synduce on github if you wish from this page. By clicking on the login button a user will be brought to a login page where you can enter your credentials. If you choose to register, you will be brought to a registration page and you can register for an account with your email and password. In both cases you will be brought to the code editor page. If you choose neither you can click on the 'Try it For Free' button and you will be brought to the code editor. Here you can type in your OCaml scripts and once you are ready you can hit the run button to synthesize the script with Synduce. After the code has executed you will be able to see the log output of the job that you had sent.

 ## Development requirements
 * If a developer were to set this up on their machine or a remote server, what are the technical requirements (e.g. OS, libraries, etc.)?
 * Briefly describe instructions for setting up and running the application (think a true README).

You must already have npm installed and working
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



 ## Licenses 

 Keep this section as brief as possible. You may read this [Github article](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository) for a start.

 * What type of license will you apply to your codebase?
 * What affect does it have on the development and use of your codebase?
 * Why did you or your partner make this choice?

We will be using an MIT license. This is because the Synduce application is already under the MIT licence and to keep things consistent we will also make our code open source and use an MIT licence.
