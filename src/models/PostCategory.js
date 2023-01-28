const postCategorySchema = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true }
  }, {
    tableName: 'posts_categories',
    underscored: true,
    timestamps: false,
  })

  PostCategory.associate = ({ Category, BlogPost }) => {
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'post_id',
      otherKey: 'category_id',
    })
    Category.belongsToMany(BlogPost, {
      as: 'posts',
      through: PostCategory,
      foreignKey: 'category_id',
      otherKey: 'post_id',
    })
  }

  return PostCategory;
}

module.exports = postCategorySchema;