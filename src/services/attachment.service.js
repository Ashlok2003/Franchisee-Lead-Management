import { createAttachment } from '../repository/attachment.repo.js';

export const uploadAttachmentService = async (data) => {
    if (
        !data.promotion_id ||
        !data.file_name ||
        !data.file_path ||
        !data.file_size ||
        !data.file_type
    ) {
        throw new Error('All attachment fields are required');
    }
    return createAttachment(data);
};
