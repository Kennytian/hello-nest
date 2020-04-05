import { ObjectId } from 'mongodb';

// 将 key 的字段转换为 ObjectId 类型
export const convertIdInObject = (input: Record<string, any>, keys?: string) => {
  const { id, ...rest } = input;
  const fields = id ? { ...rest, _id: new ObjectId(id) } : rest;
  if (!keys) {
    return fields;
  }
  const keyArray = keys.split(',');
  Object.keys(fields).forEach((key) => {
    if (keyArray.indexOf(key) > -1) {
      fields[key] = new ObjectId(fields[key]);
    }
  });
  // console.log('fields====', fields, keys);
  return fields;
};

export const convertId2Instance = (id) => {
  return { _id: new ObjectId(id) };
};
