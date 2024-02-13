import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AboutMe from "../AboutMe/AboutMe";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
// 模拟的matchMedia对象
const mockMatchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
});

// 在测试之前替换window.matchMedia
beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation(mockMatchMedia);
});
test("测试h1中文字", () => {
    const { getByText } = render(
        <MemoryRouter>
            <AboutMe />
        </MemoryRouter>,
    );
    const h1Element = getByText("关于帅气的Skyler");
    expect(h1Element).toBeInTheDocument();
});
