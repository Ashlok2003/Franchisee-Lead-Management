import { createAttachment } from '../repository/attachment.repo.js';
import { createUploadRecord } from '../repository/uploadHistory.repo.js';

export const trackUpload = async (file, metadata = {}) => {
    const uploadRecord = await createUploadRecord({
        file_name: file.originalname,
        file_path: file.path,
        metadata: {
            ...metadata,
            size: file.size,
            mimetype: file.mimetype,
        },
    });

    if (metadata.promotion_id) {
        await createAttachment({
            promotion_id: metadata.promotion_id,
            file_name: file.originalname,
            file_path: file.path,
            file_size: file.size,
            file_type: file.mimetype,
        });
    }

    return uploadRecord;
};
