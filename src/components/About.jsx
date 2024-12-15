const About = () => {
  return (
    <section className="px-16 py-12 border-t">
      <div className="flex gap-0">
        {/* Left Sidebar */}
        <div className="w-1/6">
          <p className="font-bold text-sm">about</p>
        </div>

        {/* Right Content */}
        <div className="flex-1 space-y-12">
          {/* Philosophy */}
          <div>
            <p className="font-bold text-sm mb-2">philosophy</p>
            <p className="text-sm leading-relaxed">
              A life driven by curiosity, innovation, and impact. I believe in
              learning by doing and solving problems with simplicity and
              empathy. Failure is a stepping stone, and adaptability is key to
              navigating an ever-changing world.
            </p>
          </div>

          {/* Motivators */}
          <div>
            <p className="font-bold text-sm mb-2">motivators</p>
            <p className="text-sm leading-relaxed">
              Building transformative technologies. Tackling complex challenges
              with creativity. Merging neuroscience, AI, and engineering to
              create solutions that shape the future. Empowering others to
              unlock their potential and make meaningful contributions.
            </p>
          </div>

          {/* Background */}
          <div>
            <p className="font-bold text-sm mb-2">background</p>
            <p className="text-sm leading-relaxed">
              A software engineer passionate about AI, neuroscience, and
              entrepreneurship. I’ve worked at the intersection of innovation
              and technology, contributing to cutting-edge projects like
              Brain-Computer Interface simulations and blockchain technology.
              During my college years, I successfully launched and sold a
              startup, gaining valuable experience in innovation and scaling
              ideas.
              <span className="italic">
                {" "}
                BTech, Electronics and Communication.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
