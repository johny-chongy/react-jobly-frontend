import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  // static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  //   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  //   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static token = "";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  //////COMPANY REQUESTS

  // Individual API routes

  /** Get details on all companies */
  static async getCompanies(searchTerm = {}) {
    let res = await this.request(`companies`, searchTerm);
    return res.companies;
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  //////JOB REQUESTS
  /** Get details on all jobs */
  static async getJobs(searchTerm = {}) {
    let res = await this.request(`jobs`, searchTerm);
    return res.jobs;
  }

  ///// USER REQUESTS

  /** Registers a new user and returns JWT token. */
  static async registerUser(formData = {}) {
    let res = await this.request(`auth/register`, formData, "post");
    return res.token;
  }

  /** Get user detail for a specific user by username */
  static async getUserDetail(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Login a user and returns JWT token.
   *
   * Takes as input formData, which looks like {username, password}
   */
  static async loginUser(formData = {}) {
    let res = await this.request(`auth/token`, formData, "post");
    return res.token;
  }

  /** Updates a user.
   *
   * Takes as input username (string) and an object, which looks like
   * { firstName, lastName, email }
   *
   * Returns a user object, like { username, firstName, lastName, email, isAdmin }
   */
  static async updateUser({username, firstName, lastName, email}) {
    const formData = {firstName, lastName, email}
    let res = await this.request(`users/${username}`, formData, "patch");
    return res.user;
  }

    /** user applies for a job.
   *
   * Takes as input username (str) and id (int) of applied job
   *
   *
   * Returns the jobId
   */
    static async userApplyForJob(username, jobId) {
      let res = await this.request(`users/${username}/jobs/${jobId}`,{},"post");
      return res.applied;
    }

}

export default JoblyApi;
