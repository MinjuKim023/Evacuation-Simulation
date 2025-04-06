## Inspiration
This project was inspired by the intense thunderstorms that hit Bloomington during Hackathon week. The severe weather got us thinking: what if a city had to deal with a natural disaster like this? That’s how we came up with the idea for `EvacSim`-a city evacuation simulator where a drone and a smart car work together to help the protagonist escape safely.

## What it does
`EvacSim` simulates how a drone agent and a car agent collaborate to evacuate a person from a city gridlocked with traffic. The drone provides a real-time aerial view, detecting obstacles and identifying the fastest escape routes. This information is sent to the smart car, which uses it to navigate through traffic and reach the city’s exit. To make the scenario more realistic, we added other car agents that slow down the protagonist's vehicle, simulating typical urban congestion during a disaster.

## How we built it
We built the simulation in Unity using C#. For 3D assets like the drone, cars, trees, and powerlines, we used Meshy to generate realistic models and bring our virtual city to life.

## Challenges we ran into
One major challenge was trying to train both the drone and car agents using Unity Cloud. Although we verified our student emails and submitted our student IDs, access was still denied. To keep the project moving, we adapted our workflow: one teammate focused on training the agents, another developed a website dashboard, another handled 3D modeling, and the last wrote the narrative and story elements. This flexible approach helped us stay on track.

## Accomplishments that we're proud of
We divided responsibilities effectively, but more importantly, we supported each other throughout the process. Even when working on different aspects of the project, we quickly jumped in and helped whenever someone faced a challenge. We’re proud of the teamwork and commitment we showed from start to finish.

## What we learned
We learned that developing intelligent agents with complex roles is a significant challenge—especially with a short timeline and limited prior knowledge. It pushed us to think creatively, learn quickly, and stay adaptable.

## What's next for Multi-Agent System
We look forward to expanding the simulation by introducing more agents—like panicking citizens, emergency responders, or even damaged infrastructure. Adding these elements will make the simulation feel more dynamic and bring `EvacSim` closer to a full-scale emergency response simulator.