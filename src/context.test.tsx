import { act } from "react";
import { render, screen } from "@testing-library/react";
import { AppProvider, useApp } from "./context";

jest.mock("./sections", () => ({
  sectionsMetaData: {
    section1: { name: "Section1" },
    section2: { name: "Section2" },
    section3: { name: "Section3" },
  },
}));

describe("AppContext", () => {
  it("provides default sectionsInView state", () => {
    const TestComponent = () => {
      const { sectionsInView } = useApp();
      return (
        <div>
          {sectionsInView.map((section) => (
            <div key={section.name}>
              {section.name}: {section.inView ? "true" : "false"}
            </div>
          ))}
        </div>
      );
    };

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByText("Section1: false")).not.toBeNull();
    expect(screen.getByText("Section2: false")).not.toBeNull();
    expect(screen.getByText("Section3: false")).not.toBeNull();
  });

  it("toggles a section's inView state", () => {
    const TestComponent = () => {
      const { sectionsInView, toggleSectionInView } = useApp();
      return (
        <div>
          <button
            onClick={() => toggleSectionInView("Section2", true)}
            data-testid="toggle-button"
          >
            Toggle Section2
          </button>
          {sectionsInView.map((section) => (
            <div key={section.name}>
              {section.name}: {section.inView ? "true" : "false"}
            </div>
          ))}
        </div>
      );
    };

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    const toggleButton = screen.getByTestId("toggle-button");

    expect(screen.getByText("Section2: false")).not.toBeNull();

    act(() => {
      toggleButton.click();
    });

    expect(screen.getByText("Section2: true")).not.toBeNull();
  });
});
