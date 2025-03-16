import Image from 'next/image';

/**
 * 最適化された画像コンポーネント
 * - 自動的に次世代フォーマットを使用
 * - レスポンシブデザイン対応
 * - 遅延読み込み対応
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {string} props.src - 画像のパス
 * @param {string} props.alt - 画像の代替テキスト
 * @param {number} [props.width] - 画像の幅
 * @param {number} [props.height] - 画像の高さ
 * @param {string} [props.className] - 追加のCSSクラス
 * @param {number} [props.priority] - 優先的に読み込むかどうか
 * @param {Object} [props.rest] - その他のprops
 */
export default function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  priority = false,
  ...rest 
}) {
  // サイズが指定されていない場合はfill modeを使用
  const useFillMode = !width || !height;
  
  // 共通のprops
  const imageProps = {
    src,
    alt,
    className: `${className} ${useFillMode ? 'object-cover' : ''}`.trim(),
    loading: priority ? 'eager' : 'lazy',
    priority: priority,
    ...rest
  };
  
  // サイズ指定の有無で条件分岐
  if (useFillMode) {
    return (
      <div className="relative" style={{ aspectRatio: rest.aspectRatio || 'auto' }}>
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          {...imageProps}
        />
      </div>
    );
  }
  
  // 幅と高さが指定されている場合
  return (
    <Image
      width={width}
      height={height}
      {...imageProps}
    />
  );
}
