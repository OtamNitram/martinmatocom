module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      url: [
        "http://localhost/",
        "http://localhost/about/",
        "http://localhost/contact/",
        "http://localhost/library/",
        "http://localhost/the-armor-i-called-confidence/",
      ],
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        // A shared GitHub runner scores this same page anywhere from about 0.87 to 0.93, so performance warns. It does not fail the build.
        "categories:performance": ["warn", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci",
    },
  },
};
