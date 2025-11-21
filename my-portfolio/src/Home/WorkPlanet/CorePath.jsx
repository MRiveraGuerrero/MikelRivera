import React from 'react';
import WorkNode from './WorkNode';
import styles from './CorePath.module.css';
import decoStyles from './Decorations.module.css';

const CorePath = ({ items, onNodeClick, activeItemId }) => {
    return (
        <div className={styles.pathContainer}>
            <div className={styles.centralLine}></div>
            <div className={styles.nodesWrapper}>
                {items.map((item, index) => (
                    <React.Fragment key={item.id}>
                        {/* Elementos decorativos aleatorios entre nodos */}
                        {index > 0 && (
                            <div className={decoStyles.decorationContainer} style={{ top: '-150px', left: index % 2 === 0 ? '60%' : '40%' }}>
                                {index % 2 !== 0 ? (
                                    <div className={decoStyles.suitcase} style={{ transform: 'rotate(15deg)' }}></div>
                                ) : (
                                    <div className={decoStyles.ruinPillar}></div>
                                )}
                            </div>
                        )}

                        <div className={styles.nodeRow} style={{ animationDelay: `${index * 0.2}s` }}>
                            <WorkNode
                                item={item}
                                onClick={onNodeClick}
                                isActive={activeItemId === item.id}
                            />

                            {/* Decoración lateral cerca del nodo */}
                            <div className={decoStyles.decorationContainer} style={{ left: index % 2 === 0 ? '20%' : '80%', top: '20px' }}>
                                <div className={decoStyles.crystal} style={{ opacity: 0.3 + (index * 0.1) }}></div>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
            <div className={styles.coreGlow}></div>
        </div>
    );
};

export default CorePath;
