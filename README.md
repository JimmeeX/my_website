# My Portfolio Website

Made open-source for fellow programmers to pry into to learn. May be helpful for beginners looking into frontend web-development. I am regularly making updates as I learn more tools and best practices. Have fun :).

## Tech-stack

This website is currently hosted as a static website.

- [React.js](https://reactjs.org/) - Frontend 'framework' for this website! The project was initialised using [create-react-app](https://github.com/facebook/create-react-app).
- [TypeScript](https://www.typescriptlang.org/) - Builds types into JavaScript.
- [Sass](https://sass-lang.com/) - Superset of CSS (adds extra useful features).

## Notable Packages

- [react-spring](https://www.react-spring.io/) - Physics-based animations.

## Dev Tools

- [Docker](https://www.docker.com/) - Sets up the dev environment effortlessly (and a lot more!).
- [Eslint](https://eslint.org/) - Enforce 'good' JavaScript practices & consistent code style.
- [Prettier](https://prettier.io/) - Similar to Eslint.

## Prod Tools

I used AWS to host this website. Some of its tools involve:

- [S3](https://aws.amazon.com/s3/) - Storage
- [CloudFront](https://aws.amazon.com/cloudfront/) - Caching & Efficient content delivery
- [AWS Route53](https://aws.amazon.com/route53/) - DNS Routing
- [CodePipeline](https://aws.amazon.com/codepipeline/) - CD tool
- [CodeBuild](https://aws.amazon.com/codebuild/) - CD tool used in conjunction with CodePipeline

## Running the Code

### 1. Via a [Public Docker Image](https://hub.docker.com/r/jimmeex/my_website)

If you want to run the website locally in a non-development environment, you can simply run:

`docker run -p 3000:3000 -i jimmeex/my_website`

### 2. Via the Dockerfile

If you want to play around with the website and make changes in the code, you can:

1. Download the code locally

   `git clone git@github.com:JimmeeX/my_website.git`

2. Navigate to the directory

   `cd my_website`

3. Run the development environment (requires [Docker](https://www.docker.com/) & [docker-compose](https://docs.docker.com/compose/))

   `docker-compose up --build`

### 3. Via npm

If you want to play around with the website and make changes in the code, you can:

1. Download the code locally

   `git clone git@github.com:JimmeeX/my_website.git`

2. Navigate to the directory

   `cd my_website`

3. Install packages and dependencies locally

   `yarn`

4. Run a live server under a development environment

   `yarn start`

After following the steps in any of the 3 methods above, the website should be live and accessible at [http://localhost:3000/](http://localhost:3000/)
