// using supertest package to make a request against our server
const request = require("supertest");
const app = require("./request");

describe("Test GET/posts", () => {
  test("it's should return 200 respond", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(200);
    // or
    request(app).get("/posts").expect(200).expect("Content-Type", /json/);
  });
});

describe("Test POST/add-post", () => {
  test("it's sould return 200 respond & object !", async () => {
    const obj = {
      title: "the new post",
      description: "this a shourt description",
    };
    const response = await request(app)
      .post(`/add-post/${obj.title}/${obj.description}`)
      .expect(200);
    console.log(response);
    expect(response.body).toMatchObject(obj);
  });

  test("it's should return 400 ", async () => {
    const postId = 13;
    const response = await request(app)
      .post(`/delete-post/${postId}`)
      .expect(400);
    
  });
});
