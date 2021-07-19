# Recipe Card App

## Project Overview

### Description

Ever wanted a space to store all your favourite recipes? Well this is it!

A simple recipe card web app built using the MERN stack. Simply sign up and start creating your own recipe cards.

This project initially began as a place for me to store some of the recipes I've learnt from either cook books or youtube. I needed to some place that I could easily access the recipe instead of going riffling through books or videos trying to get all the information and ingredients I needed.

I used it as an opportunity to practice some advanced authentication features as well as getting my feet wet with some new libraries.

### Features

#### Login/Registration

Users are greeted to the login screen when they first visit the site.

![Login Screenshot](/screenshots/capture01.PNG)

Users without login credentials have the opportunity to register. The registration form has some validations to ensure that the user enters appropriate information. Additionally the Register button remains inactive until the validations have passed.

![Register Screenshot](/screenshots/capture02.PNG)

Users that have forgotten their password can request a reset password email that will allow them to change their password.

![Forgot Password Screenshot](/screenshots/capture03.PNG)

![Email Screenshot](/screenshots/capture04.PNG)

The reset password token send with the email only lasts for 15 minutes, after which the user will not be able to reset their password. They will have to request a new email.

![Reset Password Screenshot](/screenshots/capture05.PNG)

#### Dashboard/Recipe Interface

Once Registration or Login has been completed the user will be sent to their dashboard which will initially be empty. A button is located on the bottom of the screen that allows a user to create a recipe.

![Dashboard Screenshot](/screenshots/capture06.PNG)

The form for adding a recipe is pretty simple and straight forward. User can add individual ingredients and remove them at will before saving the recipe. The ability to upload an image in completely optional.

![Create Recipe Form](/screenshots/capture07.PNG)

Once created the recipe card appears on the users dashboard.

![Dashboard with Recipe](/screenshots/capture08.PNG)

As already mentioned, the ability to upload an image for the recipe is optional. If no image is uploaded then recipes will have a default background.

![Dashboard Showing Default Recipe](/screenshots/capture09.PNG)

Once a recipe is selected the user is shown its full details.

![Full Recipe](/screenshots/capture10.PNG)

From here the user has the ability to edit the recipe, which will open a pre-filled form identical to the create recipe form. Or they can delete the recipe entirely.

![Delete Recipe](/screenshots/capture11.PNG)

## Development

### Technologies

#### Frontend

- React Router Dom
- Bootstrap
- Axios
- React-Spring - An animation library that helped me bring this project to life.
- React-Use - This library was needed so I had easy access to the useMeasure hook to allow me to animate the heights of certain elements with react-spring.

#### Backend

- Mongoose
- Express
- Node
- Json Web Token
- Crypto
- Nodemailer - This package gave me the ability to send emails to allow users to reset their password. SendGrid has been integrated.
- Multer - To upload files from the frontend to the server.
- AWS-SDK - Allowed me to integrate with Amazon Web Services so that I could store images on the cloud.
- ESM - Allowed me to use both ES6 import and export statements along with the common JS statements.

### Notes

Although this app seems simple on the surface, I wanted it to be as close to a full production app for a client as I could. Therefore, this seemingly simple app quickly turned into something much bigger below the surface.

I wanted to practice some advanced authentication methods, hence the integration of Nodemailer to allow users to get an email with a link for them to reset their password. It may be overkill for a project this small but it did teach me a lot.

When it came to creating actual recipes, I wanted to give users the option to upload their own images, instead of using some stock images or defaults. With this decision came another problem... where to store the images?

A lot of places I looked at online were suggesting either a folder on the frontend (not an option for me as this caused the web app to refresh) or to store them in a folder on the server. This seemed reasonable to me but I know that in a full scale production app this wouldn't be feasable as the space on the server would soon be consumed. Thus I was led into cloud storage using Amazon Web Services S3. This was the perfect solution.

This was the first time I've ever used this service and it was relatively simple to set up. I know I could have used multer-s3 to directly send the image from the front end to my S3 bucket and back but I wanted to give myself the option of working with the file before I sent it to S3. Therefore I used multer to upload the file to my server, where I could do whatever I wanted to it should I need to, before then sending it to the bucket and removing it from the server.

Finally once everything was up and running it came time to animate things. I decided to try react-spring to help me in this task. The result were excellent. The animations are far more impressive than anything I could have put together with plain CSS.
