import api from '../apiService/apiService';
import { useRepo } from 'pinia-orm';
import Resource from 'src/stores/model/resource/Resource';
import useResource from 'src/composables/resource/resourceMethods';

const repo = useRepo(Resource);
const { createResourceFromDTO } = useResource();

export default {
  async getAll() {
    return await api()
      .get('/resources/getAll')
      .then((resp) => {
        this.generateAndSaveEntityFromDTO(resp.data);
        return resp;
      })
      .catch((error) => {
        console.log('Error', error.message);
      });
  },
  async save(resource: any) {
    return await api()
      .post(`/resources/save`, resource)
      .then((resp) => {
        repo.save(createResourceFromDTO(resp.data));
        return resp;
      })
      .catch((error) => {
        console.log('Error', error);
        return error;
      });
  },
  async updateResourceTree(resourceDTO: any) {
    console.log(resourceDTO)
    let resp = null;
    resp = await api()
      .patch(`/resources/updateresourcetree`, resourceDTO)
      .then((resp) => {
        repo.save(createResourceFromDTO(resp.data));
        return resp;
      })
      .catch((error) => {
        console.log('Error', error.message);
      });
    return resp;
  },
  async uploadResource(resource: any) {
    let resp = null;
    resp = await api()
        .post(`/resources/uploadResource`, resource)
        .then((resp) => {
          repo.save(createResourceFromDTO(resp.data));
          return resp;
        })
        .catch((error) => {
          console.log('Error', error.message);
        });
    return resp;
  },
  getResourceList() {
    return repo
      .query()
      .withAllRecursive(2)
      .orderBy('id', 'asc')
      .get();
  },
  getById(id:any) {
    return repo
      .query()
      .withAllRecursive(2)
      .where('id', id)
      .orderBy('id', 'asc')
      .first();
  },
  generateAndSaveEntityFromDTO(dtoList: any) {
    dtoList.forEach((dto: any) => {
      const entity = createResourceFromDTO(dto);
      repo.save(entity);
    });
  },
  deleteAllFromStorage() {
    repo.flush();
  },
  piniaGetAll() {
    const resources = repo.query().orderBy('id', 'asc').get();
    return resources;
  },
};
