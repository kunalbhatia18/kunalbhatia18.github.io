const HardSkills = () => {
  return (
    <section className="px-16 py-12 border-t">
      <div className="flex gap-0">
        {/* Left Sidebar */}
        <div className="w-1/6">
          <p className="font-bold text-sm">hard skills</p>
        </div>

        {/* Right Content */}
        <div className="flex-1 space-y-12">
          {/* AI and Machine Learning */}
          <div>
            <p className="font-bold text-sm mb-2">ai and machine learning</p>
            <p className="text-sm leading-relaxed">
              Developing and fine-tuning AI models, optimizing real-time
              processing pipelines, building neural networks for pattern
              recognition, and deploying scalable machine learning solutions for
              practical applications.
            </p>
          </div>

          {/* Brain-Computer Interfaces */}
          <div>
            <p className="font-bold text-sm mb-2">brain-computer interfaces</p>
            <p className="text-sm leading-relaxed">
              Developing synthetic EEG data generators, designing algorithms for
              BCI applications, integrating neuroscience principles with
              technology, and creating tools for BCI simulation and analytics.
            </p>
          </div>

          {/* Front-End Development */}
          <div>
            <p className="font-bold text-sm mb-2">front-end development</p>
            <p className="text-sm leading-relaxed">
              Proficient in React, Tailwind CSS, and Vite for modern UI
              development. Expertise in building responsive and interactive web
              applications with an emphasis on clean design and usability.
            </p>
          </div>

          {/* Entrepreneurship and Strategy */}
          <div>
            <p className="font-bold text-sm mb-2">
              entrepreneurship and strategy
            </p>
            <p className="text-sm leading-relaxed">
              Successfully launched and sold a college startup. Skilled in
              ideating, developing, and scaling innovative products. Proficient
              in strategic planning, team collaboration, and execution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HardSkills;
