![Lomax AI](./public/assets/lomax.png)

This is the repository for all of the internal AI projects at Lomax A/S.

### Developer information

#### Husky
In order to keep a streamlined development process, `husky` hooks has been implemented. This means that before every commit, the application will be linted and fixed, before being able to push the code to git. Furthermore, a commit linting scheme has been implemented, such that you can only use <a href="https://www.conventionalcommits.org/en/v1.0.0/" target="_blank">conventional commits</a>. The commit schema can be seen [here](./commitlint.config.js). Lastly, before pushing the changes to git, the solution will be build locally to vercel, ensuring that the solution is able to be deployed.

#### Node (PNPM): 
**Prerequisites**
In order to run the application, you will need `pnpm` and use node v18.17.0.

**Install dependencies**
To install the dependencies, simply type
```shell
pnpm install
```

If the prisma schema is not automatically installed, you can install it by running:
```shell
npx prisma generate
```
This will create the prisma schema in the node dependencies.

**Run**
To run the application, type:
```shell
pnpm dev
```
This will startup the application on default port 3000.


#### Docker:
Coming soon

### NPS Segmenter
![nps-segmenter image](./public/assets/readme/nps-segmenter.png)