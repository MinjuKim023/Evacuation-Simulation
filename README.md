# EvacSim: Evacuation Simulation using MAS (Multi-Agents System)

<p align="center">
  <a href="https://www.youtube.com/watch?v=hO1vGT5lekk" target="_blank">
    <img src="https://img.youtube.com/vi/hO1vGT5lekk/0.jpg" alt="Watch Demo Video" width="600"/>
    <br><br>
    <strong>▶️ Watch our demonstration video with music</strong>
  </a>
</p>
 
## Inspiration

In life-threatening disasters like hurricanes, earthquakes, and nuclear emergencies, __every second counts__. Delayed response can cost lives, and traditional emergency systems often struggle to keep up—especially under chaotic, fast-changing conditions. 

A 2022 study found that average EMS response times are __7–9 minutes in urban areas__ and up to __13–19 minutes in rural regions__, a critical delay when immediate evacuation or medical assistance is needed (Fatma et al., 2022). 
<p align="center">
	<img src="https://github.com/ElijahJKim/Multi-Agent-System/blob/601e4ec79b2535e60bf4e1282f12a9a37827782f/figures/figure1.jpg" alt="Sequence of events comprising the time frame from a received emergency call..." width="600"/>
</p>

<p align="center"><em>Figure 1. Sequence of events comprising the time frame from a received emergency call to emergency medical communication centre (EMCC) until the first of all involved actors—emergency medical services (EMS), fire and rescue services (FRS), and voluntary first responders (VFR)—arrives at the scene.</em></p>

Meanwhile, research by the American Society of Civil Engineers (ASCE) shows that __autonomous vehicles significantly reduce evacuation clearance times__, thanks to faster decision-making and real-time route optimization—making them a powerful tool for life-saving operations (ASCE, 2022). 
 

But it’s not just cars—__drones are transforming disaster response__, too. A 2022 literature review highlights their growing role in mapping damage, identifying blocked roads, and locating survivors faster than human teams can react (Chowdhury et al., 2022). 
 

At the same time, public acceptance of autonomous systems is rising, especially in emergency use cases. Studies show increasing trust in self-driving tech during crises, especially when paired with clear communication and safety protocols (Zhao et al., 2023). 

 

## References 

1. __Fatma et al., 2022 (EMS Response Times)__ 
 https://www.sciencedirect.com/science/article/pii/S2666520423001911 

2. __ASCE, 2022 (Autonomous Vehicles in Emergency Evacuation)__ 
 https://ascelibrary.org/doi/10.1061/9780784485514.050 

3. __Zhao et al., 2023 (Public Acceptance of Autonomous Vehicles)__ 
 https://www.sciencedirect.com/science/article/pii/S0386111223000456 

4. __Chowdhury et al., 2022 (Drone Use in Disaster Response – Lit Review)__ 
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

 

### Agent Model Design 

Initially, we planned to train custom AI agents using reinforcement learning and export their decision-making logic as .onnx (Open Neural Network Exchange) brain files. However, due to time constraints and unexpected training errors during the hackathon, we pivoted to using __Unity’s AI Navigation 2.0 system (NavMesh)__ to simulate pathfinding. 

Even though the NavMesh allowed the evacuation vehicle to find the safest path, we wanted to preserve the __multi-agent system requirement__ (minimum three agents with autonomous communication). To keep our drone agents meaningful, we adapted the system by introducing __dynamic path obstacles__—making the evacuation car rely on drone input to identify blocked routes and dead ends. 

 
<p align="center">
	<img src="https://github.com/ElijahJKim/Multi-Agent-System/blob/601e4ec79b2535e60bf4e1282f12a9a37827782f/figures/figure2.png" alt="Road Network & Evacuation Map (Top-down)" width="600"/>
</p>

<p align="center"><em>Figure 2. Road Network & Evacuation Map (Top-down)</em></p>


This image shows the road system modeled using __network science principles__. 

- __Yellow dots__ = nodes (intersections) 

- __Yellow lines__ = edges (roads, all bidirectional) 

- __Red Xs__ = blocked paths caused by disaster events like fallen trees, traffic jams, or collapsed infrastructure 

Each simulation round randomly toggles some red Xs on/off to simulate changing disaster scenarios—so there’s __always a viable evacuation route__, but the safest path is different every time. The drone agents help identify these hazards in real time. 

 
<p align="center">
	<img src="https://github.com/ElijahJKim/Multi-Agent-System/blob/601e4ec79b2535e60bf4e1282f12a9a37827782f/figures/figure3.png" alt="Evacuation Vehicle POV (Simulation Start)" width="600"/>
</p>

<p align="center"><em>Figure 3. Evacuation Vehicle POV (Simulation Start)</em></p>

This is the __first-person view__ from the AEV (autonomous car agent). 

- You can see the __countdown timer__ at the top, showing how long the car has to evacuate. 

- The AEV receives the safest evacuation path from the drone agents and starts navigating autonomously using the AI NavMesh system. 

- The urban environment is fully modeled in Unity, including vehicles, roadblocks, and lighting to reflect a real disaster setting. 

<p align="center">
	<img src="https://github.com/ElijahJKim/Multi-Agent-System/blob/601e4ec79b2535e60bf4e1282f12a9a37827782f/figures/figure4.png" alt="Dynamic Map with Red X Toggle (Global View)" width="600"/>
</p>

<p align="center"><em>Figure 4. Dynamic Map with Red X Toggle (Global View)</em></p>

This image captures the __drone-level city view__ where red X signs indicate blocked roads. 

- These obstacles change randomly with every new simulation start. 

- The drone agents fly over the city and detect blocked nodes in real time. 

- This information is then __shared with the car agent__, enabling it to find a dynamic escape route with minimal delay. 


### Agent Behavior 

__8 Drone Agents__: Individually deployed to scan the area from above (they don’t share a “brain”) and detect hazards like fallen trees or traffic jams. They identify and flag inaccessible roads with red Xs. These obstacles are randomized each simulation round, so the exit route changes dynamically. 

<p align="center">
	<img src="https://github.com/ElijahJKim/Multi-Agent-System/blob/601e4ec79b2535e60bf4e1282f12a9a37827782f/figures/figure5.png" alt="Figure 5" width="600"/>
</p>

<p align="center"><em>Figure 5</em></p>

<p align="center">
	<img src="https://github.com/ElijahJKim/Multi-Agent-System/blob/601e4ec79b2535e60bf4e1282f12a9a37827782f/figures/figure6.png" alt="Drone agent flying in the city" width="500"/>
</p>

<p align="center"><em>Figure 6. Drone agent flying in the city</em></p>

- __1 Car Agent (AEV)__: Navigates from a safe zone to pick up evacuees based on the safest path calculated from the drone data. It follows NavMesh-based routes, and if a road is blocked, it reroutes using the drone’s updated map. 

<p align="center">
	<img src="https://github.com/ElijahJKim/Multi-Agent-System/blob/601e4ec79b2535e60bf4e1282f12a9a37827782f/figures/figure7.png" alt="Our car agent in the city" width="600"/>
</p>

<p align="center"><em>Figure 7. Our car agent in the city</em></p>


### Live Visualization via Website 

We connected Unity with a __React-based website__ using WebSocket: 

```
Unity → React Server → Browser Interface 
```

- Unity streams the live evacuation simulation to the browser. 

- React receives and renders the real-time video, letting users monitor evacuation progress. 

 

## Challenges We Ran Into 

1. __Training Agents via Unity Cloud – Access Denied__ 

One of our original goals was to train both the __drone agents__ and __evacuation car agent__ using Unity’s ML-Agents and cloud infrastructure. Even though we verified our student emails and submitted ID documentation, __Unity Cloud access was denied__, which blocked our ability to run full-scale remote training. 

To stay on track, we __quickly adapted__ by splitting our team’s efforts: 

- One teammate focused on training agents locally 

- One handled the web dashboard and data streaming 

- One worked on 3D modeling and simulation environment 

- One developed the project narrative and interaction design 

This distributed approach allowed us to continue making progress, even without cloud access. 

 

2. __Agent Training Errors + Hardware Failure__ 

Training agents locally turned out to be __time-consuming, error-prone, and computationally intense__. 
 At one point, one teammate’s GPU __overheated and physically failed__ (it emitted smoke and a burning smell), abruptly halting progress on training. 

With limited time left in the hackathon, we had to make a hard call: instead of pursuing unstable .onnx-based agents, we switched to __Unity AI Navigation (NavMesh 2.0)__ for the car agent. 

To stay on track, we quickly adapted our workflow and __divided the responsibilities across simulation, training, web, and design tasks__. By balancing technical development with visual storytelling and system integration, we were able to keep the project moving forward even under pressure. This flexible collaboration helped us stay aligned and responsive despite the technical setbacks.  


3. __Unity-to-Web Real-Time Streaming__ 

Another major hurdle was __connecting Unity’s simulation to a web dashboard__. 
 We used WebSocket to send real-time data and video streams from Unity to a React-based frontend. However, syncing the visual stream with live simulation status was tricky—especially ensuring consistent performance and minimal lag. 

Eventually, we implemented a workaround using Unity screen capture and real-time messaging via the React server, allowing our web interface to display the active simulation like an emergency command center.


## Accomplishments That We're Proud Of 

In this limited-time hackathon, we poured in our full focus and effort—__a project built with real teamwork, persistence, and care__. From the beginning, we intentionally chose a more complex and open-ended challenge. We knew it wouldn’t be easy, but we wanted to push ourselves to build something that felt thoughtful, immersive, and meaningful. 

There were real difficulties along the way—__including one teammate’s GPU burning out during training__—but we stayed committed. We kept adapting, learning, and moving forward together. And through that, we created something we’re truly proud of. 

 

- We used a __Unity Asset Store city template__ with a __dark, cyberpunk “Gotham-like” vibe__—which turned out to be a perfect fit for our disaster response theme. 

- All core visual elements—__cars, drones, trees, powerlines__, and other props—were __AI-generated__ using Meshy.ai to match the mood and scale of the city. 

- To take it even further, we used __Udio__ to generate __original sound effects and music__, carefully aligned with the urban disaster aesthetic. The sound design helped elevate the urgency and cinematic feel of the simulation. 

 

What makes us proud is not just the technical execution—but how much __heart__ we put into every part of the experience. We genuinely cared about building something engaging, dramatic, and meaningful—even when the clock was ticking. Even with all the challenges—technical errors, limited time, and hardware failures—we enjoyed every part of working together. We’re proud that we __chose the hard way__, not because we had to, but because we believed in the idea and in each other. 

 

## What We Learned 

This hackathon was a powerful reminder of how far rapid prototyping has come—generative AI tools supercharged our creative process. From Meshy.ai for generating environment assets to Udio for designing immersive soundscapes, we discovered how accessible and exciting it is to bring big ideas to life in a short time. 

 

We also learned how to connect Unity simulations to a live website using React and WebSockets, allowing us to stream real-time POVs from both the evacuation car and the drone agents. Also, we learned how to integrate multiple technologies smoothly—from game engines to web frontends—to simulate a real-time rescue system with multi-agent logic. 

 

Another key takeaway was building intelligent agents with complex, autonomous behaviors is hard—especially under time pressure. Training was resource-intensive (one of our GPUs literally overheated and stopped working), and we had to make critical design pivots to keep going. 

 

Most importantly, this experience reminded us of the true spirit of a hackathon: __not giving up__. Even when challenges seemed impossible, we kept moving forward as a team—and often found better solutions by staying flexible and working together. 



## What's Next for Multi-Agent Systems 

While we're proud of what we accomplished during this hackathon, we also see exciting opportunities for further development and expansion of our system. Given the intense time and resource constraints, we had to make strategic choices—and we believe the decisions we made were the right ones for this context. But there’s still so much more we’re excited to explore moving forward. 

 

1. __Scaling Up: More Agents, Greater Efficiency__ 

Our system currently includes __eight aerial drone agents and one autonomous ground vehicle__—meeting the case requirement of at least three communicating agents. However, in __real-world disaster response scenarios__, increasing the number of autonomous agents could __dramatically improve performance__. 

 

Adding more agents would allow for a __denser mesh of coverage__, accelerating: 

- Hazard detection 

- Route discovery 

- Real-time decision-making 

Especially in large-scale evacuations, __more agents means more eyes in the sky and more coordination on the ground__, reducing human risk and improving outcomes. 

 

We believe future versions of EvacSim could explore __swarm-based intelligence__ to enhance coordination between agents, dynamically adjust roles, and respond even faster to unexpected changes. 

 

2. __Smarter Agents: Local Training for Complex Behaviors__ 

We originally planned to train custom intelligent agents using Unity ML-Agents and .onnx brain files, but this required computational resources we simply didn’t have. One of our team’s GPUs failed mid-training, and with limited time and energy, we pivoted to using __Unity AI Navigation 2.0 (NavMesh)__. 

 

While NavMesh was the most practical option for the hackathon, we know it’s only the beginning. __In the future, with more GPU access, time, and stability__, we hope to: 

Train and fine-tune agents in a local reinforcement learning environment 

Introduce behavioral variance among agents 

Enable fully autonomous, data-driven learning and decision-making 

 

We also acknowledge the challenges: local training demands proper tuning, error handling, memory management, and a lot of trial and error. In a hackathon setting, we believe choosing NavMesh was the right call—it allowed us to meet the requirements and still build something functional, immersive, and intelligent. 

 



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
