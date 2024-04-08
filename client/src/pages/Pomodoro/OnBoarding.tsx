import React, { useState } from "react";

function SurveyPage() {
  const [responses, setResponses] = useState({
    gender: "",
    neurodiversity: [],
    age: "",
    race: "",
    diet: [],
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setResponses((prevResponses) => ({
      ...prevResponses,
      [name]:
        type === "checkbox"
          ? checked
            ? [...prevResponses[name], value]
            : prevResponses[name].filter((item) => item !== value)
          : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(responses); // Here you would typically send this data to a backend server
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Survey</h2>

      <section>
        <h3>Gender</h3>
        <label>
          <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
        </label>
        <label>
          <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
        </label>
        <label>
          <input type="radio" name="gender" value="Other" onChange={handleChange} /> Other
        </label>
      </section>

      <section>
        <h3>Neurodiversity</h3>
        <label>
          <input type="checkbox" name="neurodiversity" value="ADHD" onChange={handleChange} /> ADHD
        </label>
        <label>
          <input type="checkbox" name="neurodiversity" value="Autism" onChange={handleChange} />{" "}
          Autism
        </label>
        <label>
          <input type="checkbox" name="neurodiversity" value="None" onChange={handleChange} /> None
        </label>
      </section>

      <section>
        <h3>Age</h3>
        <label>
          <input type="radio" name="age" value="Under 18" onChange={handleChange} /> Under 18
        </label>
        <label>
          <input type="radio" name="age" value="18-24" onChange={handleChange} /> 18-24
        </label>
        <label>
          <input type="radio" name="age" value="25-34" onChange={handleChange} /> 25-34
        </label>
        <label>
          <input type="radio" name="age" value="35-44" onChange={handleChange} /> 35-44
        </label>
        <label>
          <input type="radio" name="age" value="45 or older" onChange={handleChange} /> 45 or older
        </label>
      </section>

      <section>
        <h3>Race</h3>
        <label>
          <input type="radio" name="race" value="Asian" onChange={handleChange} /> Asian
        </label>
        <label>
          <input type="radio" name="race" value="Black" onChange={handleChange} /> Black
        </label>
        <label>
          <input type="radio" name="race" value="Hispanic" onChange={handleChange} /> Hispanic
        </label>
        <label>
          <input type="radio" name="race" value="White" onChange={handleChange} /> White
        </label>
        <label>
          <input type="radio" name="race" value="Other" onChange={handleChange} /> Other
        </label>
      </section>

      <section>
        <h3>Diet</h3>
        <label>
          <input type="checkbox" name="diet" value="Vegan" onChange={handleChange} /> Vegan
        </label>
        <label>
          <input type="checkbox" name="diet" value="Vegetarian" onChange={handleChange} />{" "}
          Vegetarian
        </label>
        <label>
          <input type="checkbox" name="diet" value="Pescetarian" onChange={handleChange} />{" "}
          Pescetarian
        </label>
        <label>
          <input type="checkbox" name="diet" value="Meat-eater" onChange={handleChange} />{" "}
          Meat-eater
        </label>
      </section>

      <button type="submit">Submit</button>
    </form>
  );
}

export default SurveyPage;
