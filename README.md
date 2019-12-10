# PaperBoy-Problem
Dist/State/Town with Regular expression search

steps : 

git clone repo
go to repo
npm install
npm run dev


POST API 

http://localhost:3000/api/create-state
  --> just hit api to create state shema
  
 GET API - for read states                                                    
 
 http://localhost:3000/api/state/:value                                    
 
  
  GET API - for read cities                                                                 
 
 http://localhost:3000/api/town/:value                                   


 GET API - for read district                                          
 http://localhost:3000/api/district/:value 


For ALL GET APIs

example - just passing params as == kera (kerala 0R karnataka etc ... states)
(form back-end testing using params else we send values in query params from front-end)
  http://localhost:3000/api/state/Kera 
