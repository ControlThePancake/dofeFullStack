# dofeFullStack
#Domain : botpulse.xyz
#Email : admin@botpulse.xyz
#Disclaimer

This is a very much an "i'll wing it and try learn something new" project so any help would be appreciated , and there will probably be alot of flaws but as long as it works i couldnt care less

Making a full stack website for DOFE silver. The website is gonna hopefully have an account system using OAuth, some bots running off of a home server, and a payment system using stripe API,and possibly integrating certain AI features in the future . I've changed the stack to a MERN stack, previously I was only going to use Petite VUE, a fork of regular VUE, and Firebase DB. I will be hosting it on AWS and use MongoDB as the database, MongoDB is alot more freeform compared to other databases like MySQL. Hopefully this website will be alive for longer than just a DOFE project,I did buy the domain for ages, and im hoping to implement some countermeasures against people creating many alt accounts as there will be a token based system on the website with the use of bots costing the user tokens.I will maybe expand it as a portfolio website of sorts or something else entirely. I built the base of the project following this youtube tutorial, https://www.youtube.com/watch?v=K8YELRmUb5o, up to about half way. You can see I shamelessly used his design as I am hopeless when it comes to designing a nice looking UI, believe me, I tried, what is a colour wheel. After implementing the basic authentication and cookies, I tried to ditch the tutorial and start designing the webpages myself. Im currently at the UI stage with plans to implement Oauth, stripe and an API system to my other server, which is currently dead, with about a month remaining for the project. Seeing as exams are over I should be able to no life this, and hopefully finish well within the remaining month, seeing how bored I am over Iceland I might even finish then. If i have time, id like to experiment with captcha's but thats something I see myself doing after the DOFE deadline.

UPDATE 1
I've finished everything concerning the UI and im on the final stage of development with hosting and implementing stripe API, which is alot harder than I expected. Hoping to finish it by the 19th of March but no promises.

UPDATE 2 
So ive procrastinated on this thing for ages, finally got the stripe api/webhook thing to work all thats left is some python flask stuff, eg hoping to make it so that the processing isnt done on the cloud server but locally by sending an api request or something (cloud hosting be expensive). Also now hosting on azure and not aws because github education gives $100 credit for it and i dont want to be spending more money than i have to. Probably gonna have to start building evidence for the dofe project. (also yes i leaked the test key but i rolled it relatively quickly, lets hope its not in a data set somewhere now)(also way over the theoretical deadline but it doesnt really matter)

If you have any inquires or suggestions, either email me or just make a fork and submit a pull request
This also probably wont work for anyone trying to fork it, as the .env files and some other stuff are gone cause of gitignore
