import { Text, TextProps } from './Themed';

/**
 * @deprecated
 * TODO: Delete during clean up
 */

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}
