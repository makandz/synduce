# Synduce/ 6 Devs 1 App

> _Note:_ This document is meant to evolve throughout the planning phase of your project. That is, it makes sense for you commit regularly to this file while working on the project (especially edits/additions/deletions to the _Highlights_ section). Most importantly, it is a reflection of all the planning you work you've done in the first iteration.
> **This document will serve as a master plan between your team, your partner and your TA.**

## Product Details

#### Q1: What are you planning to build?

We will be buliding an online web code editor that users can use to write code and synthesis code completions with the help of Synduce. This web application will allow users to easily access Synduce's code completions technology at any given time. Synduce is a program synthesis tool: a programmer writes an incomplete program with a precise description of how it should work, and Synduce completes this program. The Software Engineering Lab at UofT continues to expand the tool's functionalities which requires manual installations on the user's sytem whenever there is a new release. Currently, if you wish to use Synduce, you need to install Synduce and its dependencies after which you can run the software through the command-line interface. However, this workflow is extremely inconvient for those who want quick access to Synduce's capabilities. For that reason, our project focuses on building a web interface for Synduce by building an easy-to-use frontend for the user that communicates with a backend wrapping around Synduce. We wish to build this product such that the any new releases from the Synduce team can easily be made available to all users through a simple deploy process. The design of the frontend will include displaying aggregate information about the code execution for users to analyze.

> Short (1 - 2 min' read)

- Start with a single sentence, high-level description of the product.
- Be clear - Describe the problem you are solving in simple terms.
- Be concrete. For example:
  - What are you planning to build? Is it a website, mobile app,
    browser extension, command-line app, etc.?
  - When describing the problem/need, give concrete examples of common use cases.
  - Assume your the reader knows nothing about the problem domain and provide the necessary context.
- Focus on _what_ your product does, and avoid discussing _how_ you're going to implement it.  
  For example: This is not the time or the place to talk about which programming language and/or framework you are planning to use.
- **Feel free (and very much encouraged) to include useful diagrams, mock-ups and/or links**.

#### Q2: Who are your target users?

Our target users are mainly researchers that would be willing to work or are already currently working with Synduce (the program we are interfacing with). Another type of user would be anyone that would like to introduce themselves to the capabilities/functionality of Synduce.

> Question details:
>
> > Short (1 - 2 min' read max)
>
> - Be specific (e.g. a 'a third-year university student studying Computer Science' and not 'a student')
> - **Feel free to use personas. You can create your personas as part of this Markdown file, or add a link to an external site (for example, [Xtensio](https://xtensio.com/user-persona/)).**

#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

The purpose of the product is to firstly allow for a web application that does not require a user to dowload the Synduce project, build it, feed it code, and run it in the command line. It would be much more easily accessible to not only researchers, but anyone else interseted in learning about Synduce if everything was online. The convenience of accessing, and using the Synduce software through a web app would be appealing. Secondly, a user might want to better understand what Synduce is doing behind the scenes but looking at command line output is not necessarily attractive. Our product would enhance this experience leaving the command line entirely and displaying log information elegantly and intuitively so it easier for one to read.

> Question Details:
>
> > Short (1 - 2 min' read max)
>
> - We want you to "connect the dots" for us - Why does your product (as described in your answer to Q1) fits the needs of your users (as described in your answer to Q2)?
> - Explain the benefits of your product explicitly & clearly. For example:

    * Save users time (how much?)
    * Allow users to discover new information (which information? And, why couldn't they discover it before?)
    * Provide users with more accurate and/or informative data (what kind of data? Why is it useful to them?)
    * Does this application exist in another form? If so, how does your differ and provide value to the users?
    * How does this align with your partner's organization's values/mission/mandate?

#### Q4: How will you build it?

> Short (1-2 min' read max)

- What is the technology stack? Specify any and all languages, frameworks, libraries, PaaS products or tools.
- How will you deploy the application?
- Describe the architecture - what are the high level components or patterns you will use? Diagrams are useful here.
- Will you be using third party applications or APIs? If so, what are they?
- What is your testing strategy?

#### Q5: What are the user stories that make up the MVP?

- At least 5 user stories concerning the main features of the application - note that this can broken down further
- You must follow proper user story format (as taught in lecture) `As a <user of the app>, I want to <do something in the app> in order to <accomplish some goal>`
- User stories must contain acceptance criteria. Examples of user stories with different formats can be found here: https://www.justinmind.com/blog/user-story-examples/. **It is important that you provide a link to an artifact containing your user stories**.
- If you have a partner, these must be reviewed and accepted by them

---

## Intellectual Property Confidentiality Agreement

> Note this section is **not marked** but must be completed briefly if you have a partner. If you have any questions, please contact David and Adam.
>
> **By default, you own any work that you do as part of your coursework.** However, some partners may want you to keep the project confidential after the course is complete. As part of your first deliverable, you should discuss and agree upon an option with your partner. Examples include:

1. You can share the software and the code freely with anyone with or without a license, regardless of domain, for any use.
2. You can upload the code to GitHub or other similar publicly available domains.
3. You will only share the code under an open-source license with the partner but agree to not distribute it in any way to any other entity or individual.
4. You will share the code under an open-source license and distribute it as you wish but only the partner can access the system deployed during the course.

**Briefly describe which option you have agreed to. Your partner cannot ask you to sign any legally binding agreements or documents pertaining to non-disclosure, confidentiality, IP ownership, etc.**

---

## Process Details

#### Q6: What are the roles & responsibilities on the team?

Describe the different roles on the team and the responsibilities associated with each role.

- Roles should reflect the structure of your team and be appropriate for your project. Not necessarily one role to one team member.

List each team member and:

- A description of their role(s) and responsibilities including the components they'll work on and non-software related work
- 3 technical strengths and weaknesses each (e.g. languages, frameworks, libraries, development methodologies, etc.)

#### Q7: What operational events will you have as a team?

Currently we are planning to have a flexible meeting schedule where we will use an ad-hoc approach through Discord, for any quick questions/comments/concerns. If we require any additional information that may be more easily communicated via a "face-to-face" meeting, we will do so through Zoom. These Zoom meetings will most likely occur during our scheduled tutorial time (Monday 8pm - 9pm).

The purpose of each of the Zoom meeting would be to discuss any extra-ordinary issues or changes that needs to be communicated to our partner. If our partner also has such concerns those can be addressed there as well. We use the meetings to demo our current, under-development application to verify if our partner is still on board with our decisions, if they have any suggestions for improvement, or if we are missing some key required elements. Otherwise if we have any simpler questions, Discord would be more convenient for both the team and our partner.

Since our entire team is in the same lecture and tutorial slot, it would be trivial for us to hold a quick sync meeting to make sure everyone is on track and knows what they are doing. If there are any other issues, those can also be dealt with.

In our first meeting with our partner we clarified what the scope of the project was. We discussed the purpose and key elements of the application to get an idea of what they were looking for. We also discussed further communication methods and were mostly in agreement with the schedule and platform details that we would use as described above. This meeting lasted approximately 45 minutes.

In our second meeting...

> Question Details:
> Describe meetings (and other events) you are planning to have.
>
> - When and where? Recurring or ad hoc? In-person or online?
> - What's the purpose of each meeting?
> - Other events could be coding sessions, code reviews, quick weekly sync meeting online, etc.
> - You must have at least 2 meetings with your project partner (if you have one) before D1 is due. Describe them here:
>   - What did you discuss during the meetings?
>   - What were the outcomes of each meeting?
>   - You must provide meeting minutes.
>   - You must have a regular meeting schedule established by the second meeting.

#### Q8: What artifacts will you use to self-organize?

List/describe the artifacts you will produce in order to organize your team.

- Artifacts can be To-Do lists, Task boards, schedule(s), meeting minutes, etc.
- We want to understand:
  - How do you keep track of what needs to get done?
  - **How do you prioritize tasks?**
  - How do tasks get assigned to team members?
  - How do you determine the status of work from inception to completion?

#### Q9: What are the rules regarding how your team works?

Describe your team's working culture.

**Communications:**
It is not too difficult for us to communicate with each other effectively. Since we are using Discord, the frequency can potentially be daily.

As mentioned in Q7, our partner can commincate with us through discord for any quick question or concerns. If there is a meeting to be held, it would be done through Zoom on Monday's from 8pm - 9pm.

> - What is the expected frequency? What methods/channels are appropriate?
> - If you have a partner project, what is your process (in detail) for communicating with your partner?

**Meetings:**

> - How are people held accountable for attending meetings, completing action items? Is there a moderator or process?

**Conflict Resolution:**

- List at least three team scenarios/conflicts you discussed in lecture and how you decided you will resolve them. Indecisions? Non-responsive team members? Any other scenarios you can think of?

---

## Highlights

Specify 3 - 5 key decisions and/or insights that came up during your meetings
and/or collaborative process.

- Short (5 min' read max)
- Decisions can be related to the product and/or the team process.
  - Mention which alternatives you were considering.
  - Present the arguments for each alternative.
  - Explain why the option you decided on makes the most sense for your team/product/users.
- Essentially, we want to understand how (and why) you ended up with your current product and process plan.
- This section is useful for important information regarding your decision making process that may not necessarily fit in other sections.
