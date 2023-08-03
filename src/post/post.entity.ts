import { Column, DataType, ForeignKey, Table, Model, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/user/user.entity';

@Table({
  tableName: 'post',
  timestamps: true
})
export class Post extends Model<Post> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  content: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true
  })
  rating: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
    allowNull: false
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}