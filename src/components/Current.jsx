const Current = () => {
  return (
    <section className="px-6 sm:px-16 py-12 border-t">
      <div className="flex flex-wrap gap-6">
        {/* Left Sidebar */}
        <div className="w-full sm:w-1/6">
          <p className="font-bold text-sm">current</p>
        </div>

        {/* Right Content */}
        <div className="flex-1 space-y-8">
          {/* Role */}
          <div>
            <p className="text-sm">
              <span className="font-bold">Role:</span> SDE at RBIH
            </p>
          </div>

          {/* Timezone */}
          <div>
            <p className="text-sm">
              <span className="font-bold">Timezone:</span> Indian Standard Time
              (GMT+5:30)
            </p>
          </div>

          {/* Elsewhere */}
          <div>
            <p className="text-sm">
              <span className="font-bold">Elsewhere:</span>{" "}
              <a
                href="https://github.com/kunalbhatia18"
                className="text-blue-600 underline"
              >
                GitHub
              </a>
              ,{" "}
              <a
                href="https://x.com/kunalbhatia_18"
                className="text-blue-600 underline"
              >
                X
              </a>
              ,{" "}
              <a
                href="https://www.instagram.com/kunal_bhatia18/"
                className="text-blue-600 underline"
              >
                Instagram
              </a>
              ,{" "}
              <a
                href="https://medium.com/@kunal18042002"
                className="text-blue-600 underline"
              >
                Medium
              </a>
              , and{" "}
              <a
                href="https://www.linkedin.com/in/kunalbhatia18/"
                className="text-blue-600 underline"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm">
              <span className="font-bold">Contact:</span>{" "}
              <a
                href="https://www.linkedin.com/in/kunalbhatia18/"
                className="text-blue-600 underline"
              >
                Send a message
              </a>{" "}
              about new opportunities or collaborations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Current;
