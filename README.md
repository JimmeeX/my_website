# My Portfolio Website

Made open-source for fellow programmers to pry into to learn. May be helpful for beginners looking into frontend web-development. I am regularly making updates as I learn more tools and best practices. Have fun :).

## Tech-stack

This website is currently hosted as a static website.

- [React.js](https://reactjs.org/) - Frontend 'framework' for this website! The project was initialised using [create-react-app](https://github.com/facebook/create-react-app).
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

1. Download the code locally

   ```git clone git@github.com:JimmeeX/my_website.git```

2. Navigate to the directory

    ```cd my_website```

3. Run the development environment (requires [Docker](https://www.docker.com/) & [docker-compose](https://docs.docker.com/compose/))

    ```docker-compose up --build```

4. That's it! The website should be live and accessible at [http://localhost:3000/]
