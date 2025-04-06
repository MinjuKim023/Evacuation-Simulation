# EvacSim: Evacuation Simulation using MAS (Multi-Agents System)

## Inspiration

In life-threatening disasters like hurricanes, earthquakes, and nuclear emergencies, __every second counts__. Delayed response can cost lives, and traditional emergency systems often struggle to keep up—especially under chaotic, fast-changing conditions. 

A 2022 study found that average EMS response times are __7–9 minutes in urban areas__ and up to __13–19 minutes in rural regions__, a critical delay when immediate evacuation or medical assistance is needed (Fatma et al., 2022). 
[Picture]("Sequence of events comprising the time frame from a received emergency call to emergency medical communication centre (EMCC) until the first of all involved actors; emergency medical services (EMS); fire and rescue services (FRS); and voluntary first responders (VFR), arrives at the scene.")

Meanwhile, research by the American Society of Civil Engineers (ASCE) shows that __autonomous vehicles significantly reduce evacuation clearance times__, thanks to faster decision-making and real-time route optimization—making them a powerful tool for life-saving operations (ASCE, 2022). 
 

But it’s not just cars—__drones are transforming disaster response__, too. A 2022 literature review highlights their growing role in mapping damage, identifying blocked roads, and locating survivors faster than human teams can react (Chowdhury et al., 2022). 
 

At the same time, public acceptance of autonomous systems is rising, especially in emergency use cases. Studies show increasing trust in self-driving tech during crises, especially when paired with clear communication and safety protocols (Zhao et al., 2023). 

 

## References 

Fatma et al., 2022 (EMS Response Times) 
 https://www.sciencedirect.com/science/article/pii/S2666520423001911 

ASCE, 2022 (Autonomous Vehicles in Emergency Evacuation) 
 https://ascelibrary.org/doi/10.1061/9780784485514.050 

Zhao et al., 2023 (Public Acceptance of Autonomous Vehicles) 
 https://www.sciencedirect.com/science/article/pii/S0386111223000456 

Chowdhury et al., 2022 (Drone Use in Disaster Response – Lit Review) 
 https://onlinelibrary.wiley.com/doi/10.1111/itor.13484 

 

## What It Does? 

__EvacSim__ is a real-time disaster evacuation simulation powered by a __Multi-Agent System (MAS)__ made up of drones and an autonomous evacuation vehicle. 

In each simulation round, the system automatically: 

1. __Detects road hazards__ like blocked streets, traffic jams, or fallen objects using __8 individual drone agents__ flying over the city. 

2. __Updates the evacuation map__ in real time based on drone input—highlighting unsafe routes with red Xs and recalculating paths. 

3. __Sends evacuation instructions__ to a __self-driving electric vehicle (AEV)__, which uses the shortest and safest route to rescue and evacuate citizens within a __2-minute countdown__. 

4. __Streams live simulation footage__ to a web interface using WebSocket, allowing viewers to monitor agent behavior in real time—like an emergency control dashboard. 

Every run is different. Hazard zones change with each simulation start, meaning agents have to adapt dynamically—just like they would in a real disaster. 

EvacSim combines AI-powered autonomy, real-time map intelligence, and agent collaboration to __simulate smarter, faster evacuations__ under pressure. 

 

## How We Built? 

We built __EvacSim__ in Unity using a custom-designed city map with roads, cars, and obstacles to simulate real-world evacuation challenges. Our system integrates nine __autonomous agents__—eight drones and one evacuation vehicle—communicating in real time to optimize rescue routes and evacuation performance. 

 

## Agent Model Design 

Initially, we planned to train custom AI agents using reinforcement learning and export their decision-making logic as .onnx (Open Neural Network Exchange) brain files. However, due to time constraints and unexpected training errors during the hackathon, we pivoted to using __Unity’s AI Navigation 2.0 system (NavMesh)__ to simulate pathfinding. 

Even though the NavMesh allowed the evacuation vehicle to find the safest path, we wanted to preserve the __multi-agent system requirement__ (minimum three agents with autonomous communication). To keep our drone agents meaningful, we adapted the system by introducing __dynamic path obstacles__—making the evacuation car rely on drone input to identify blocked routes and dead ends. 

 

[Picture]("Road Network & Evacuation Map (Top-down)")

This image shows the road system modeled using __network science principles__. 

- __Yellow dots__ = nodes (intersections) 

- __Yellow lines__ = edges (roads, all bidirectional) 

- __Red Xs__ = blocked paths caused by disaster events like fallen trees, traffic jams, or collapsed infrastructure 

Each simulation round randomly toggles some red Xs on/off to simulate changing disaster scenarios—so there’s __always a viable evacuation route__, but the safest path is different every time. The drone agents help identify these hazards in real time. 

 

[Picture]("Evacuation Vehicle POV (Simulation Start)") 

This is the __first-person view__ from the AEV (autonomous car agent). 

- You can see the __countdown timer__ at the top, showing how long the car has to evacuate. 

- The AEV receives the safest evacuation path from the drone agents and starts navigating autonomously using the AI NavMesh system. 

- The urban environment is fully modeled in Unity, including vehicles, roadblocks, and lighting to reflect a real disaster setting. 

[Picture]("Dynamic Map with Red X Toggle (Global View)") 

This image captures the __drone-level city view__ where red X signs indicate blocked roads. 

- These obstacles change randomly with every new simulation start. 

- The drone agents fly over the city and detect blocked nodes in real time. 

- This information is then __shared with the car agent__, enabling it to find a dynamic escape route with minimal delay. 


## Agent Behavior 

__8 Drone Agents__: Individually deployed to scan the area from above (they don’t share a “brain”) and detect hazards like fallen trees or traffic jams. They identify and flag inaccessible roads with red Xs. These obstacles are randomized each simulation round, so the exit route changes dynamically. 

Picture 

[Picture]("Drone agent flying in the city")

- __1 Car Agent (AEV)__: Navigates from a safe zone to pick up evacuees based on the safest path calculated from the drone data. It follows NavMesh-based routes, and if a road is blocked, it reroutes using the drone’s updated map. 

PictureOur car agent in the city 


## Live Visualization via Website 

We connected Unity with a __React-based website__ using WebSocket: 

```
Unity → React Server → Browser Interface 
```

- Unity streams the live evacuation simulation to the browser. 

- React receives and renders the real-time video, letting users monitor evacuation progress. 

 

## Challenges We Ran Into 

1. Training Agents via Unity Cloud – Access Denied 

One of our original goals was to train both the __drone agents__ and __evacuation car agent__ using Unity’s ML-Agents and cloud infrastructure. Even though we verified our student emails and submitted ID documentation, __Unity Cloud access was denied__, which blocked our ability to run full-scale remote training. 

To stay on track, we __quickly adapted__ by splitting our team’s efforts: 

- One teammate focused on training agents locally 

- One handled the web dashboard and data streaming 

- One worked on 3D modeling and simulation environment 

- One developed the project narrative and interaction design 

This distributed approach allowed us to continue making progress, even without cloud access. 

 

2. Agent Training Errors + Hardware Failure 

Training agents locally turned out to be __time-consuming, error-prone, and computationally intense__. 
 At one point, one teammate’s GPU __overheated and physically failed__ (it emitted smoke and a burning smell), abruptly halting progress on training. 

With limited time left in the hackathon, we had to make a hard call: instead of pursuing unstable .onnx-based agents, we switched to __Unity AI Navigation (NavMesh 2.0)__ for the car agent. 

To stay on track, we quickly adapted our workflow and __divided the responsibilities across simulation, training, web, and design tasks__. By balancing technical development with visual storytelling and system integration, we were able to keep the project moving forward even under pressure. This flexible collaboration helped us stay aligned and responsive despite the technical setbacks.  

⃣  

3. Unity-to-Web Real-Time Streaming 

Another major hurdle was __connecting Unity’s simulation to a web dashboard__. 
 We used WebSocket to send real-time data and video streams from Unity to a React-based frontend. However, syncing the visual stream with live simulation status was tricky—especially ensuring consistent performance and minimal lag. 

Eventually, we implemented a workaround using Unity screen capture and real-time messaging via the React server, allowing our web interface to display the active simulation like an emergency command center.

## Development

## Checkout the codebase
git clone

## Install project dependencies
npm install

## Run react
npm run dev

## Build compiled css and js
npm run build

## Dependencies
- `framer-motion`: An animation library for React combining JavaScript animations and native browser APIs
- `react-icons`: An icon library for React
- `react-lottie`: A library for lottie animation view for React
- `react-router-dom`: The DOM-specific bindings for `react-router`, a library used for declarative routing in React applications 
- `recoil`: An experimental state management library for React
- `styled-reset`: A CSS-reset library for `styled-components`