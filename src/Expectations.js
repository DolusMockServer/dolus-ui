import React, { Component } from 'react';

class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      data: null, // Initialize the data state to null
    };
  }

  async fetchData() {
    try {
      const response = await fetch('http://localhost:1080/v1/dolus/expectations');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      this.setState({ data }); // Update the component's state with the fetched data
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        {/* Render the fetched data in the div */}
        {data ? (
          <div>
          <h3> Expectations: </h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    );
  }
}

export default MyComponent;
