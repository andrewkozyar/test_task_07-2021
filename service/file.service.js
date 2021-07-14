const path = require('path');
const uuid = require('uuid').v1;

module.exports = {
    pathDirBuilder: (docName, itemId, itemType, item) => {
        const pathWithoutPublic = path.join(item, `${itemId}`, itemType);
        const dirPath = path.join(process.cwd(), 'static', pathWithoutPublic);
        const fileExtension = docName.split('.').pop();
        const fileName = `${uuid()}.${fileExtension}`;
        const finalPath = path.join(dirPath, fileName);

        const uploadPath = path.join(pathWithoutPublic, fileName);

        return { finalPath, uploadPath, dirPath };
    },

};
