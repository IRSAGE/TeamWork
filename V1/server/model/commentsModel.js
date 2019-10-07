import dotenv from 'dotenv';


dotenv.config();

class commentModel {
  constructor(commentid, articleid, authorid, comment) {
    this.commentid = commentid;
    this.articleid = articleid;
    this.authorid = authorid;
    this.comment = comment;
  }
}
export default commentModel;
