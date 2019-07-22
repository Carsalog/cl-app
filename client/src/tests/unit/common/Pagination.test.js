import React from "react";
import {render} from "enzyme";
import Pagination from "../../../components/common/pagination";


describe("Pagination", () => {
  let component;

  it("Make sure that Pagination will display when amount > pageSize", () => {
    component = render(<Pagination amount={100} currentPage={1} onPageChange={jest.fn()} pageSize={10}/>);
    expect(component.find("ul").length).toBe(1);
    expect(component.find("li").length).toBe(10);
  });

  it("Make sure that Pagination will not display when amount < pageSize", () => {
    component = render(<Pagination amount={10} currentPage={1} onPageChange={jest.fn()} pageSize={10}/>);
    expect(component.find("ul").length).toBe(0);
    expect(component.find("li").length).toBe(0);
  });
});