exports.insertOne = (table, params) => {
    const data = table.create({
        data: params
    });
    return data;
}

exports.insertMany = (table, params) => {
    const data = table.createMany({
        data: params
    });
    return data;
}

exports.findMany = (table, params) => {
    let data;
    if (params.select || params.where) {
        data = table.findMany({
          where: params.where,
          select: params.select,
        });
        return data;
      }
    data = table.findMany();
    return data;
}

exports.findUnique = (table, params) => {
    let data;
    if(params.select){
        data = table.findUnique({
            where: params.where,
            select: params.select
        });
        return data
    }
    data = table.findUnique({
        where: params
    });
    return data;
}

exports.findFirst = (table, params) => {
    let data;
    if(params.select){
        data = table.findFirst({
            where: params.where,
            select: params.select
        });
        return data
    }
    data = table.findFirst(params)
    return data;
}

exports.updateOne = (table, params) => {
    const data = table.update({
        where: {
            id: params.id
        },
        data: params.updateData
    });
    return data;
}

exports.updateMany = (table, params) => {
    const data = table.updateMany({
        where: params.where,
        data: params.updateData
    })
    return data
}

exports.deleteMany = (table, params) => {
    const data = table.deleteMany({
        where: params.where
    })
    return data
}