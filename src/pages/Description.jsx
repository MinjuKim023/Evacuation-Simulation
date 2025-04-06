import React from "react";
import description_img from "../assets/time_figure.jpg";

const Description = () => {
  return (
    <div className="description">
      <div className="description-container">
        <div className="section">
          <h1>Inspiration</h1>

          <p>
            This project was inspired by the intense thunderstorms that hit
            Bloomington during Hackathon week. The severe weather got us
            thinking: what if a city had to deal with a natural disaster like
            this? That’s how we came up with the idea for <code>EvacSim</code>—a
            city evacuation simulator where a drone and a smart car work
            together to help the protagonist escape safely.
          </p>
        </div>

        <div className="section">
          {" "}
          <h1>What it does</h1>
          <p>
            <code>EvacSim</code> simulates how a drone agent and a car agent
            collaborate to evacuate a person from a city gridlocked with
            traffic. The drone provides a real-time aerial view, detecting
            obstacles and identifying the fastest escape routes. This
            information is sent to the smart car, which uses it to navigate
            through traffic and reach the city’s exit. To make the scenario more
            realistic, we added other car agents that slow down the
            protagonist's vehicle, simulating typical urban congestion during a
            disaster.
          </p>
          <img src={description_img} alt="" />
        </div>

        <div className="section">
          {" "}
          <h1>How we built it</h1>
          <p>
            We built the simulation in Unity using C#. For 3D assets like the
            drone, cars, trees, and powerlines, we used Meshy to generate
            realistic models and bring our virtual city to life.
          </p>
        </div>

        <div className="section">
          <h1>Challenges we ran into</h1>
          <p>
            One major challenge was trying to train both the drone and car
            agents using Unity Cloud. Although we verified our student emails
            and submitted our student IDs, access was still denied. To keep the
            project moving, we adapted our workflow: one teammate focused on
            training the agents, another developed a website dashboard, another
            handled 3D modeling, and the last wrote the narrative and story
            elements. This flexible approach helped us stay on track.
          </p>
        </div>

        <div className="section">
          {" "}
          <h2>Accomplishments that we're proud of</h2>
          <p>
            We divided responsibilities effectively, but more importantly, we
            supported each other throughout the process. Even when working on
            different aspects of the project, we quickly jumped in and helped
            whenever someone faced a challenge. We’re proud of the teamwork and
            commitment we showed from start to finish.
          </p>
        </div>

        <div className="section">
          {" "}
          <h1>What we learned</h1>
          <p>
            We learned that developing intelligent agents with complex roles is
            a significant challenge—especially with a short timeline and limited
            prior knowledge. It pushed us to think creatively, learn quickly,
            and stay adaptable.
          </p>
        </div>

        <div className="section">
          {" "}
          <h1>What's next for Multi-Agent System</h1>
          <p>
            We look forward to expanding the simulation by introducing more
            agents—like panicking citizens, emergency responders, or even
            damaged infrastructure. Adding these elements will make the
            simulation feel more dynamic and bring <code>EvacSim</code> closer
            to a full-scale emergency response simulator.
          </p>{" "}
        </div>
      </div>
    </div>
  );
};

export default Description;
