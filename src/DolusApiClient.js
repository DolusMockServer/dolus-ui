
import {Configuration, DefaultApi } from "./gen/api/src";


const ApiConfiguration = new Configuration()
ApiConfiguration.basePath = process.env.REACT_APP_DOLUS_API_URL || "http://localhost:1080"
const DolusApiClient = new DefaultApi(ApiConfiguration)
export default DolusApiClient


