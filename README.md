Backend Node JS (Typescript) Dans Multipro Test - Arnadi

<h2>How to run : </h2>

<ul>
    <li>Run npm install / yarn install</li>
    <li>Go to directory and open in terminal</li>
    <li>Run npm run start / yarn run start</li>
</ul>

<h2>API List : </h2>

<h2>Login Instruction : </h2>
<ul>
    <li>Open postman app</li>
    <li>Set url to : http://localhost:3000/login</li>
    <li>Set body (JSON) with { 'username' : 'admin', 'password' : 'admin' } </li>
</ul>

<h2>API Jobs Instruction : </h2>
<ul>
    <li>Open postman app</li>
    <li>
        There is 2 endpoint :
        <ul>
            <li>http://localhost:3000/jobs <- with inlcuded parameters in instructions (use query string)</li>
            <li>http://localhost:3000/jobs/{ID} <- must provide jobs ID</li>
        </ul> 
    </li>
    <li>Don't forget to add bearer token, token can be acquired from login API</li>
</ul>