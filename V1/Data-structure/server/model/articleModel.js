import dotenv from 'dotenv';


dotenv.config();

class articleModel {
  constructor(id, authorid, title, article, category, createdOn) {
    this.id = id;
    this.authorid = authorid;
    this.title = title;
    this.article = article;
    this.category = category;
    this.createdon = createdOn;
  }
}
export default articleModel;
