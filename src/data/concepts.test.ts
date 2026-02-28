import { describe, it, expect } from "vitest";
import {
  difficultyBadgeStyles,
  ALL_CATEGORIES,
  concepts,
} from "./concepts";
import type { Difficulty, ConceptCategory } from "./concepts";

// ---------------------------------------------------------------------------
// difficultyBadgeStyles
// ---------------------------------------------------------------------------

describe("difficultyBadgeStyles", () => {
  const validDifficulties: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];

  it("contains an entry for every valid difficulty", () => {
    for (const d of validDifficulties) {
      expect(difficultyBadgeStyles).toHaveProperty(d);
    }
  });

  it("has exactly 3 keys — no extra or missing difficulties", () => {
    expect(Object.keys(difficultyBadgeStyles)).toHaveLength(3);
  });

  it.each(validDifficulties)(
    'value for "%s" is a non-empty string',
    (difficulty) => {
      const value = difficultyBadgeStyles[difficulty];
      expect(typeof value).toBe("string");
      expect(value.trim().length).toBeGreaterThan(0);
    }
  );
});

// ---------------------------------------------------------------------------
// ALL_CATEGORIES
// ---------------------------------------------------------------------------

describe("ALL_CATEGORIES", () => {
  const expectedCategories: ConceptCategory[] = [
    "Core CLI",
    "Intelligence",
    "Memory",
    "Automation",
    "Integration",
  ];

  it("contains exactly 5 categories", () => {
    expect(ALL_CATEGORIES).toHaveLength(5);
  });

  it.each(expectedCategories)(
    'includes the category "%s"',
    (category) => {
      expect(ALL_CATEGORIES).toContain(category);
    }
  );

  it("has no duplicate categories", () => {
    const unique = new Set(ALL_CATEGORIES);
    expect(unique.size).toBe(ALL_CATEGORIES.length);
  });
});

// ---------------------------------------------------------------------------
// concepts array — structural integrity
// ---------------------------------------------------------------------------

describe("concepts array", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(concepts)).toBe(true);
    expect(concepts.length).toBeGreaterThan(0);
  });

  describe("required string fields on every concept", () => {
    it.each(concepts)('concept "$slug" has a non-empty slug', ({ slug }) => {
      expect(typeof slug).toBe("string");
      expect(slug.trim().length).toBeGreaterThan(0);
    });

    it.each(concepts)('concept "$slug" has a non-empty title', ({ slug, title }) => {
      expect(typeof title).toBe("string");
      expect(title.trim().length).toBeGreaterThan(0);
    });

    it.each(concepts)('concept "$slug" has a non-empty emoji', ({ slug, emoji }) => {
      expect(typeof emoji).toBe("string");
      expect(emoji.trim().length).toBeGreaterThan(0);
    });

    it.each(concepts)('concept "$slug" has a non-empty shortDesc', ({ slug, shortDesc }) => {
      expect(typeof shortDesc).toBe("string");
      expect(shortDesc.trim().length).toBeGreaterThan(0);
    });
  });

  describe("slug uniqueness", () => {
    it("every slug is unique across all concepts", () => {
      const slugs = concepts.map((c) => c.slug);
      const unique = new Set(slugs);
      expect(unique.size).toBe(slugs.length);
    });
  });

  describe("category validity", () => {
    it.each(concepts)(
      'concept "$slug" has a valid category',
      ({ slug, category }) => {
        expect(ALL_CATEGORIES).toContain(category);
      }
    );
  });

  describe("difficulty validity", () => {
    const validDifficulties: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];

    it.each(concepts)(
      'concept "$slug" has a valid difficulty',
      ({ slug, difficulty }) => {
        expect(validDifficulties).toContain(difficulty);
      }
    );
  });

  describe("sections — every concept has at least one", () => {
    it.each(concepts)(
      'concept "$slug" has at least one section',
      ({ slug, sections }) => {
        expect(Array.isArray(sections)).toBe(true);
        expect(sections.length).toBeGreaterThan(0);
      }
    );
  });

  describe("sections — heading and body", () => {
    for (const concept of concepts) {
      for (const [index, section] of concept.sections.entries()) {
        it(`concept "${concept.slug}" section[${index}] has a non-empty heading`, () => {
          expect(typeof section.heading).toBe("string");
          expect(section.heading.trim().length).toBeGreaterThan(0);
        });

        it(`concept "${concept.slug}" section[${index}] has a non-empty body`, () => {
          expect(typeof section.body).toBe("string");
          expect(section.body.trim().length).toBeGreaterThan(0);
        });
      }
    }
  });

  describe("sections — screenshots shape when present", () => {
    for (const concept of concepts) {
      for (const [index, section] of concept.sections.entries()) {
        if (section.screenshots !== undefined) {
          it(`concept "${concept.slug}" section[${index}] screenshots is a non-empty array`, () => {
            expect(Array.isArray(section.screenshots)).toBe(true);
            expect(section.screenshots!.length).toBeGreaterThan(0);
          });

          for (const [imgIndex, screenshot] of section.screenshots.entries()) {
            it(`concept "${concept.slug}" section[${index}] screenshot[${imgIndex}] has non-empty src`, () => {
              expect(typeof screenshot.src).toBe("string");
              expect(screenshot.src.trim().length).toBeGreaterThan(0);
            });

            it(`concept "${concept.slug}" section[${index}] screenshot[${imgIndex}] has non-empty alt`, () => {
              expect(typeof screenshot.alt).toBe("string");
              expect(screenshot.alt.trim().length).toBeGreaterThan(0);
            });
          }
        }
      }
    }
  });

  describe("sections — carousel requires screenshots", () => {
    for (const concept of concepts) {
      for (const [index, section] of concept.sections.entries()) {
        if (section.carousel === true) {
          it(`concept "${concept.slug}" section[${index}] with carousel:true also has a screenshots array`, () => {
            expect(Array.isArray(section.screenshots)).toBe(true);
            expect(section.screenshots!.length).toBeGreaterThan(0);
          });
        }
      }
    }
  });

  describe("sections — code block shape when present", () => {
    for (const concept of concepts) {
      for (const [index, section] of concept.sections.entries()) {
        if (section.code !== undefined) {
          it(`concept "${concept.slug}" section[${index}] code.language is non-empty`, () => {
            expect(typeof section.code!.language).toBe("string");
            expect(section.code!.language.trim().length).toBeGreaterThan(0);
          });

          it(`concept "${concept.slug}" section[${index}] code.content is non-empty`, () => {
            expect(typeof section.code!.content).toBe("string");
            expect(section.code!.content.trim().length).toBeGreaterThan(0);
          });
        }
      }
    }
  });

  describe("sections — table shape when present", () => {
    for (const concept of concepts) {
      for (const [index, section] of concept.sections.entries()) {
        if (section.table !== undefined) {
          it(`concept "${concept.slug}" section[${index}] table.headers is a non-empty array`, () => {
            expect(Array.isArray(section.table!.headers)).toBe(true);
            expect(section.table!.headers.length).toBeGreaterThan(0);
          });

          it(`concept "${concept.slug}" section[${index}] table.rows is an array`, () => {
            expect(Array.isArray(section.table!.rows)).toBe(true);
          });
        }
      }
    }
  });

  describe("references — shape when present", () => {
    for (const concept of concepts) {
      if (concept.references !== undefined) {
        it(`concept "${concept.slug}" references is a non-empty array`, () => {
          expect(Array.isArray(concept.references)).toBe(true);
          expect(concept.references!.length).toBeGreaterThan(0);
        });

        for (const [refIndex, ref] of concept.references.entries()) {
          it(`concept "${concept.slug}" reference[${refIndex}] has non-empty label`, () => {
            expect(typeof ref.label).toBe("string");
            expect(ref.label.trim().length).toBeGreaterThan(0);
          });

          it(`concept "${concept.slug}" reference[${refIndex}] has non-empty url`, () => {
            expect(typeof ref.url).toBe("string");
            expect(ref.url.trim().length).toBeGreaterThan(0);
          });
        }
      }
    }
  });

  describe("released concepts — all required fields populated", () => {
    const releasedConcepts = concepts.filter((c) => c.released === true);

    it("there is at least one released concept", () => {
      expect(releasedConcepts.length).toBeGreaterThan(0);
    });

    it.each(releasedConcepts)(
      'released concept "$slug" has a non-empty slug',
      ({ slug }) => {
        expect(slug.trim().length).toBeGreaterThan(0);
      }
    );

    it.each(releasedConcepts)(
      'released concept "$slug" has a non-empty title',
      ({ slug, title }) => {
        expect(title.trim().length).toBeGreaterThan(0);
      }
    );

    it.each(releasedConcepts)(
      'released concept "$slug" has a non-empty shortDesc',
      ({ slug, shortDesc }) => {
        expect(shortDesc.trim().length).toBeGreaterThan(0);
      }
    );

    it.each(releasedConcepts)(
      'released concept "$slug" has at least one section',
      ({ slug, sections }) => {
        expect(sections.length).toBeGreaterThan(0);
      }
    );
  });
});

// ---------------------------------------------------------------------------
// Specific spot-checks
// ---------------------------------------------------------------------------

describe("spot-checks — specific concepts", () => {
  it('the "getting-started" concept exists', () => {
    const c = concepts.find((c) => c.slug === "getting-started");
    expect(c).toBeDefined();
  });

  it('the "getting-started" concept is released', () => {
    const c = concepts.find((c) => c.slug === "getting-started");
    expect(c?.released).toBe(true);
  });

  it('the "subagents" concept exists', () => {
    const c = concepts.find((c) => c.slug === "subagents");
    expect(c).toBeDefined();
  });

  it('the "subagents" concept has title "Subagents"', () => {
    const c = concepts.find((c) => c.slug === "subagents");
    expect(c?.title).toBe("Subagents");
  });

  it('the "subagents" concept has a section with heading "Creating Your Own Subagent"', () => {
    const c = concepts.find((c) => c.slug === "subagents");
    const section = c?.sections.find(
      (s) => s.heading === "Creating Your Own Subagent"
    );
    expect(section).toBeDefined();
  });

  it('the "Creating Your Own Subagent" section has carousel:true', () => {
    const c = concepts.find((c) => c.slug === "subagents");
    const section = c?.sections.find(
      (s) => s.heading === "Creating Your Own Subagent"
    );
    expect(section?.carousel).toBe(true);
  });

  it('the "Creating Your Own Subagent" section has 10 or more screenshots', () => {
    const c = concepts.find((c) => c.slug === "subagents");
    const section = c?.sections.find(
      (s) => s.heading === "Creating Your Own Subagent"
    );
    expect(section?.screenshots).toBeDefined();
    expect(section?.screenshots!.length).toBeGreaterThanOrEqual(10);
  });
});
