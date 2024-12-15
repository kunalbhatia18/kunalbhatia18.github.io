const WritingAndMore = () => {
  return (
    <section className="px-16 py-12 border-t">
      <div className="flex gap-0">
        {/* Left Sidebar */}
        <div className="w-1/6">
          <p className="font-bold text-sm">writing and more</p>
        </div>

        {/* Right Content */}
        <div className="flex-1 space-y-12">
          {/* Articles */}
          <div>
            <p className="font-bold text-sm mb-2">articles</p>
            <div className="space-y-4">
              <div>
                <a
                  href="https://medium.com/@kunal18042002/the-intersection-of-ai-and-neuroscience-181f52bdfa93"
                  className="text-blue-600 underline text-sm"
                >
                  The Intersection of AI and Neuroscience
                </a>
                <p className="text-sm leading-relaxed">
                  Exploring how artificial intelligence can decode brain
                  activity and enhance human-computer interaction. This article
                  delves into the potential of Brain-Computer Interfaces and
                  their impact on various industries.
                </p>
              </div>
              <div>
                <a
                  href="https://medium.com/@kunal18042002/my-experience-with-score-lab-in-gci-12102013506b"
                  className="text-blue-600 underline text-sm"
                >
                  My Experience with SCoRe Lab in GCI
                </a>
                <p className="text-sm leading-relaxed">
                  <p className="text-sm leading-relaxed">
                    A throwback to my journey as a 16-year-old contributing to
                    open-source projects with SCoRe Lab during Google Code-In
                    2019. Looking back now, it’s a little embarrassing to see
                    how much I’ve grown since then, but this experience laid the
                    foundation for my passion for tech and coding.
                  </p>
                </p>
              </div>
            </div>
          </div>

          {/* Speaking */}
          <div>
            <p className="font-bold text-sm mb-2">speaking</p>
            <div className="space-y-4">
              <div>
                <a
                  href="https://www.amazon.in/Lets-Talk-Krypto/dp/B08KF3LMFS"
                  className="text-blue-600 underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Let’s Talk Krypto: Blockchain and Startups
                </a>
                <p className="text-sm leading-relaxed">
                  Creator of the &quot;Let’s Talk Krypto&quot; podcast. This
                  podcast was born during my first startup journey and explored
                  blockchain, cryptocurrency, and the entrepreneurial mindset.
                </p>
              </div>
            </div>
          </div>

          {/* Open Source Contributions */}
          <div>
            <p className="font-bold text-sm mb-2">open source contributions</p>
            <div className="space-y-4">
              <div>
                <a
                  href="https://codein.withgoogle.com/archive/2019/"
                  className="text-blue-600 underline text-sm"
                >
                  Google Code-In Runner Up 2019-20
                </a>
                <p className="text-sm leading-relaxed">
                  Recognized for contributions to open-source projects,
                  including developing innovative solutions in Python and
                  collaborating with global teams to solve real-world problems
                  in technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WritingAndMore;
