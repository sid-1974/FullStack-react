import conf from "../conf/Conf";
import { Client, Databases,Storage,Query,ID } from "appwrite";

export class Service {
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket =new Storage(this.client)
    }

//get post
    async getPost(slug){
        try {
          return  this.databases.getDocument(conf.appwriteDatabaseId,
                                            conf.appwriteCollectionId,
                                             slug)
        } catch (error) {
            console.log("Appwrite services :: getPost()",error)
            return false
        }
    }
//list posts
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await  this.databases.listDocuments(conf.appwriteDatabaseId, 
                                                       conf.appwriteCollectionId, 
                                                        queries)
          } catch (error) {
              console.log("Appwrite services :: getPosts()",error)
              return false
          }
    }
//create post
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await  this.databases.createDocument(conf.appwriteDatabaseId,
                                                         conf.appwriteCollectionId,
                                                         slug,
                                                         {title,content,featuredImage,status,userId})
          } catch (error) {
              console.log("Appwrite services :: createPost()",error)
              return false
          }
    }
//update post
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await  this.databases.updateDocument(conf.appwriteDatabaseId,
                                                         conf.appwriteCollectionId,
                                                         slug,
                                                         {title,content,featuredImage,status})
          } catch (error) {
              console.log("Appwrite services :: updatePost()",error)
              return false
          }
    }
//delete post
    async deletePost(slug){
        try {
            return await  this.databases.deleteDocument(conf.appwriteDatabaseId, 
                                                        conf.appwriteCollectionId,
                                                        slug)
            return true
          } catch (error) {
              console.log("Appwrite services :: deletePost()",error)
              return false
          }
    }


    ///storage services(bucket)>>>

//uploadFile
    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appwriteBucketId,
                                                ID.unique(),
                                                file
            )
        } catch (error) {
            console.log("Appwrite services :: uploadFile()",error)
              return false
        }
    }
//DeleteFile
    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(conf.appwriteBucketId,
                                                fileId
            )
        } catch (error) {
            console.log("Appwrite services :: deleteFile()",error)
              return false
        }
    }
//fliepreview
    getFilePreview(filed){
        return this.bucket.getFilePreview(conf.appwriteBucketId,
                                            conf.fileId
        ).href
    }
}

const service = new  service()
export default service;

